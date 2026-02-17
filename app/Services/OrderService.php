<?php 

namespace App\Services;

use App\Enums\OrderStatus;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class OrderService {
    private readonly ProductService $productService;

    public function __construct(ProductService $productService) {
        $this->productService = $productService; // ProductService instance
    }

    /**
     * Creates a new Order for the given user
     * 
     * Shipping data is copied from the User (throws RuntimeException if is empty)
     * 
     * Values for subtotal, iva, total_price are initialized at cero. They will be updates with OrderLine data
     * 
     * @param User $user
     * @throws RuntimeException
     * @return Order
     */
    public function createOrder(User $user): Order {
        if (
            empty($user->address) ||
            empty($user->city) ||
            empty($user->province) ||
            empty($user->postal_code)
        ) {
            throw new RuntimeException("El usuario '{$user->full_name}' no tiene dirección de envío completa.");
        }

        return Order::create([
            'order_number' => $this->generateOrderNumber(),
            'user_id' => $user->id,
            'order_date' => now(),
            'subtotal_without_iva' => 0,
            'iva' => 0,
            'total_price' => 0,
            'status' => OrderStatus::PENDING,
            'shipping_address' => $user->address,
            'shipping_city' => $user->city,
            'shipping_province' => $user->province,
            'shipping_postal_code' => $user->postal_code,
        ]);
    }

    /**
     * Recalculates and updates the order totals based on OrderLines.
     * @param Order $order
     * @return void
     */
    public function recalculateTotals(Order $order): void {
        // 1 Load all OrderLines
        $order->load('orderLines');

        // 2 Calculate subtotals, iva and total price from OrderLines
        $subtotalWithoutIva = $order->orderLines->sum('subtotal_without_iva'); // sum column values and return total
        $iva = $order->orderLines->sum('subtotal_iva');
        $totalPrice = $order->orderLines->sum('subtotal_with_iva');

        // 3 Save values on Order
        $order->subtotal_without_iva = $subtotalWithoutIva;
        $order->iva = $iva;
        $order->total_price = $totalPrice;
        $order->save();
    }

    /**
     * Order Status -> Cancelled
     * 
     * For each OrderLine, increase Product stock by quantity
     * 
     * @param Order $order
     * @throws RuntimeException
     * @return void
     */
    public function cancelOrder(Order $order): void {
        // 1 Check Order Status first
        if ($order->status === OrderStatus::CANCELLED) {
            throw new RuntimeException("El pedido '{$order->order_number}' ya está cancelado.");
        }

        if ($order->status === OrderStatus::DELIVERED) {
            throw new RuntimeException("El pedido '{$order->order_number}' ya fue entregado y no puede cancelarse.");
        }

        // 2 Transaction that increase the Stock of all Product on OrderLine that belongs to Order
        DB::transaction(function () use ($order) {
            $order->load('orderLines.product');

            foreach ($order->orderLines as $orderLine) {
                $this->productService->increaseStock($orderLine->product, $orderLine->quantity);
            }

            $order->status = OrderStatus::CANCELLED;
            $order->save();
        });
    }

    /**
     * Remove an order and restore the stock for all Products on OrderLine
     * @param Order $order
     * @return void
     */
    public function removeOrder(Order $order): void
    {
        DB::transaction(function () use ($order) {
            $order->load('orderLines.product');

            foreach ($order->orderLines as $line) {
                $this->productService->increaseStock($line->product, $line->quantity);
            }

            $order->delete();
        });
    }

    /**
     * Generate Order Number from time and random hexadecimal number
     * 
     * The numbers are always ordenated, because the timestamp of linux is incremental.
     * 
     * The last 4 bytes are generated randomly. Thus, there should be imposible that two order_numbers collide.
     * @return string
     */
    public function generateOrderNumber() : string {
        $time = now()->timestamp;
        $random = strtoupper(substr(bin2hex(random_bytes(2)), 0, 4));

        return "ORD-{$time}-{$random}";
    }
}