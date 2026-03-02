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
     * Add a product to the cart, or increase quantity
     * 
     * [
     *      $id => [ 'product_id' => $id, 'quantity' => $currentQuantity + $quantity ],
     *      ... 
     * ]
     *  
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function add(int $id, Request $request) {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        // 1 Remove cache cart
        $this->cartService->clearCache();

        // 2 Check if product exists
        $product = Product::findOrFail($id);

        // 3 Get cart and currentQuantity for product If already exists
        $cart = session('cart');
        $currentQuantity = $cart[$product->id]['quantity'] ?? 0;

        // 4 Update Session Cart
        session(['cart.' . $product->id => [
            'product_id' => $product->id,
            'quantity' => $currentQuantity + $validated['quantity'],
        ]]);

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

        // Remove cache cart
        $this->cartService->clearCache();
        
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

        return back()->with('success', 'Cantidad actualizada.');
    }

    /**
     * Remove an item from the cart
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function remove(int $id) {
        $cart = session('cart', []);

        // Remove cache cart
        $this->cartService->clearCache();

        if (!isset($cart[$id])) {
            return back()->with('error', 'Producto no encontrado en el carrito.');
        }

        unset($cart[$id]);
        session(['cart' => $cart]);

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
