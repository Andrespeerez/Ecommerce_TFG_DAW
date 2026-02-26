<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\OrderLineService;
use App\Services\OrderService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    private readonly OrderService $orderService;
    private readonly OrderLineService $orderLineService;

    public function __construct(
        OrderService $orderService,
        OrderLineService $orderLineService
    ) {
        $this->orderService = $orderService;
        $this->orderLineService = $orderLineService;
    }

    public function store(Request $request) {
        $max_items_total = config('cart.max_items_total', 20);
        $max_items_per_product = config('cart.max_items_per_product', 10);
        $user = $request->user();

        $cartSession = session('cart', []);

        if (count($cartSession) == 0) {
            return back()->with('error', 'El carrito está vacío.');
        }

        $totalItems = array_sum(array_column($cartSession, 'quantity')); //  array_column() : [quantity1, quantity2, ...] -> array_sum()
        if ($totalItems > $max_items_total) {
            return back()->with('error', "No puedes comprar más de $max_items_total");
        }

        $products = [];

        foreach ($cartSession as $productId => $item) {
            try {
                $product = Product::findOrFail($productId);
                $products[$productId] = $product;
            } catch (Exception $exception) {
                return back()->with('error', 'No se encontró el producto');
            }

            if (!$product->active) {
                return back()->with('error', "El producto '$product->name' no está activo.");
            }

            if ($item['quantity'] > $max_items_per_product) {
                return back()->with('error', "No puedes comprar más de $max_items_per_product unidades del mismo producto.");
            }

            if ($item['quantity'] > $product->stock) {
                return back()->with('error', "No hay suficiente stock de '$product->name'.");
            }            
        }

        try {
            DB::beginTransaction();

            $order = $this->orderService->createOrder($user);

            foreach ($cartSession as $productId => $item) {
                $product = $products[$productId];
                $quantity = $item['quantity'];

                $this->orderLineService->addOrderLine($order, $product, $quantity);
            }

            session(['cart' => []]);

            DB::commit();

            return redirect()->route('profile.orders')->with('success', "Pedido realizado con éxito.");

        } catch (Exception $exception) {
            DB::rollBack();

            return back()->with('error', "Error al procesar el pedido.");
        }
    }
}
