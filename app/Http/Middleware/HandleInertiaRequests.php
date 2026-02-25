<?php

namespace App\Http\Middleware;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {   
        // 1 Initialize Cart if doesn't exists
        if (!session()->has('cart')) {
            session(['cart' => []]);
        }

        /*
        cart session store something like this:
        cart = [
            1 => ['product_id' => 1, 'quantity' => 2],
            ...
        ]

        cart prop should have a structure like this:
        cart = {
            items : [
                { 
                    data: { id: 2, name: "...", price: ... },
                    quantity: ..., 
                    errors: [...] 
                },
                { 
                    data: {id: 5, name: "...", price: ..., } 
                    quantity: ...,
                    errors: [...] 
                }, ...
            ],
            total_items : ...,
            errors: [...],
        }
        */

        // 2 Object to return as a prop
        $cart = session('cart', []);

        $cartItems = empty($cart) ? collect() : 
            Product::whereIn('id', array_keys($cart))->get()
                ->map(function($product) use ($cart) {
                    $quantity = $cart[$product->id]['quantity'];
                    $itemErrors = [];

                    if (!$product->active) {
                        $itemError[] = 'El producto ya no está disponible';
                    }

                    if (!$quantity > $product->stock) {
                        $itemError[] = 'No hay stock suficiente';
                    }

                    return [
                        'data' => $product,
                        'quantity' => $quantity,
                        'errors' => $itemError,
                    ];
                });

        
        $totalItems = $cartItems->sum('quantity');
        $totalPrice = $cartItems->sum(fn($item) => $item['data']->price_with_iva * $item['quantity']);

        $cartErrors = [];
        if ($totalItems > 20) {
            $cartErrors[] = 'Tienes demasiados productos en el carrito';
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'categories' => Cache::remember('categories', 3600, function () {
                return Category::select('id', 'name', 'active')
                          ->where('active', true)
                          ->get();
            }),
            'cart' => [
                'items' => $cartItems,
                'total_items' => $totalItems,
                'total_price' => $totalPrice,
                'errors' => $cartErrors,
            ],
        ];
    }
}
