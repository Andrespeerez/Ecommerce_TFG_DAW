<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Collection;

class CartService { 

    /**
     * Get Cache Key for the current user or session if not authed
     * @return string
     */
    private function getCacheKey(): string {
        $userId = auth()->id() ?? session()->getId();

        return "cart_items_{$userId}";
    }

    /**
     * Clear the cache (remove the cached cart)
     * 
     * Use this after change anything in the cart
     * 
     * @return void
     */
    public function clearCache() {
        Cache::forget($this->getCacheKey());
    }

    /**
     * Get cart from session 
     * 
     * cart is the simple version stored in server
     * 
     * cart_items_... is the version we send to Inertia::render() that we save in cache
     * 
     * @return array
     */
    private function getCart(): array {
        return session('cart', []);
    } 

    /**
     * Get the items in the cart from database and store them in cache using the getCacheKey as Key.
     * 
     * @param int $time - Time in seconds to cache
     * @return Collection
     */
    public function getCartItems(int $time = 1): Collection {
        $cart = $this->getCart();

        // Get all Cart Items from database and store them in Cache
        return Cache::remember($this->getCacheKey(), $time, function() use ($cart) {
            // Case Empty: Return empty collection 
            if (empty($cart)) {
                return collect();
            }

            return Product::whereIn('id', array_keys($cart))->get()
                ->map(function($product) use ($cart) {
                    $quantity = $cart[$product->id]['quantity'];
                    $itemErrors = [];

                    $max_items_per_product = config('cart.max_items_per_product');

                    if (!$product->active) {
                        $itemErrors[] = 'El producto ya no está disponible';
                    }

                    if ($quantity > $product->stock) {
                        $itemErrors[] = 'No hay stock suficiente';
                    }

                    if ($quantity > $max_items_per_product) {
                        $itemErrors[] = "No puedes tener más de $max_items_per_product items del mismo producto";
                    }

                    return [
                        'data' => $product,
                        'quantity' => $quantity,
                        'errors' => $itemErrors,
                    ];
                });
        });
    }

}