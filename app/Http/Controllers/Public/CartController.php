<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    private  readonly CartService $cartService;

    public function __construct() {
        $this->cartService = new CartService();
    }


    /**
     * Add a product to the cart, or increase quantity in 1
     *
     * if there is not enough stock, or the quantity of product is bigger than the max_limit, return with errors
     * 
     * [
     *      $id => [ 'product_id' => $id, 'quantity' => $currentQuantity + 1 ],
     *      ... 
     * ]
     *  
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function add(int $id) {
        $max_items_total = config('cart.max_items_total');
        $max_items_per_product = config('cart.max_items_per_product');

        // 1 Check if product exists
        $product = Product::findOrFail($id);

        // 2 Get cart and currentQuantity for product If already exists
        $cart = session('cart');
        $currentQuantity = $cart[$product->id]['quantity'] ?? 0;

        // 3 Check if enough stock
        if ($currentQuantity + 1 > $product->stock) {
            return back()->with('error', 'No hay suficiente stock.');
        }

        // 4 Check if max limit for product is exceded
        if ($currentQuantity + 1 > $max_items_per_product) {
            return back()->with('error', 'Máximo 10 unidades por producto.');
        }

        // 5 Check if max limit total is exceded
        $totalItems = array_sum(array_column($cart, 'quantity'));
        if ($totalItems + 1 > $max_items_total) {
            return back()->with('error', 'Has alcanzado el límite de productos en el carrito.');
        }

        // 6 Update Session Cart
        session(['cart.' . $product->id => [
            'product_id' => $product->id,
            'quantity' => $currentQuantity + 1,
        ]]);

        // 7 Remove cache cart
        $this->cartService->clearCache();

        return back()->with('success', 'Producto agregado al carrito.');;
    }

    /**
     * Decrease the quantity of the product on 1
     * 
     * If quantity is 0, remove it instead
     * 
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function decrease(int $id) {
        $cart = session('cart', []);
        
        if (!isset($cart[$id])) {
            return back()->with('error', 'Producto no encontrado en el carrito.');
        }

        $currentQuantity = $cart[$id]['quantity'];

        // If quantity is lower than 1, remove it!
        if ($currentQuantity <= 1) {
            return $this->remove($id);
        }
        
        $cart[$id]['quantity'] = $currentQuantity - 1;
        session(['cart' => $cart]);

        // Remove cache cart
        $this->cartService->clearCache();

        return back()->with('success', 'Cantidad actualizada.');
    }

    /**
     * Remove an item from the cart
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function remove(int $id) {
        $cart = session('cart', []);

        if (!isset($cart[$id])) {
            return back()->with('error', 'Producto no encontrado en el carrito.');
        }

        unset($cart[$id]);
        session(['cart' => $cart]);

        // Remove cache cart
        $this->cartService->clearCache();

        return back()->with('success', 'Producto eliminado del carrito.');
    }

    /**
     * Clear all product on the cart
     * @return \Illuminate\Http\RedirectResponse
     */
    public function clear() {
        session(['cart' => []]);
        $this->cartService->clearCache();

        return back()->with('success', 'Carrito vaciado.');
    }

    
}
