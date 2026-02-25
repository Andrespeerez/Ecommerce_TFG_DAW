<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
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
        $currentQuantity = isset($cart[$product->id]->quantity) ? $cart[$product->id]->quantity : 0;

        // 3 Check if enough stock
        if ($currentQuantity + 1 > $product->stock) {
            return back()->with('error', 'No hay suficiente stock.');
        }

        // 4 Check if max limit is exceded
        if ($currentQuantity + 1 > $max_items_per_product) {
            return back()->with('error', 'Máximo 10 unidades por producto.');
        }

        // 5 Update Session Cart
        session(['cart.' . $product->id => [
            'product_id' => $product->id,
            'quantity' => $currentQuantity + 1,
        ]]);

        return back();
    }

    
}
