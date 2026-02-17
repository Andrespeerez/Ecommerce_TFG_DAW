<?php 

namespace App\Services;

use App\Models\Order;
use App\Models\OrderLine;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class OrderLineService 
{
    private readonly ProductService $productService;
    private readonly OrderService $orderService;

    public function __construct(
        ProductService $productService,
        OrderService $orderService,
    ) {
        $this->productService = $productService;
        $this->orderService = $orderService;
    }

    /**
     * Add new OrderLine
     * 
     * Pre Create: Check if there is enough stock before creating the OrderLine and calculate the subtotals
     * 
     * Post Create: Decrease Product Stock and Recalculates the Order subtotals and total price
     * 
     * @param Order $order
     * @param Product $product
     * @param int $quantity
     * @throws RuntimeException
     * @return OrderLine
     */
    public function addOrderLine(Order $order, Product $product, int $quantity): OrderLine {
        if ($quantity <= 0) {
            throw new RuntimeException("La cantidad debe ser mayor que cero");
        }

        return DB::transaction(function() use ($order, $product, $quantity) {
            $product = Product::lockForUpdate()->findOrFail($product->id); // lockForUpdate avoid the lines to change while the transaction is alive

            // 1 PRE CREATE: Check if there is enough stock
            $this->productService->checkStock($product, $quantity);

            // 2 PRE CREATE: Calculate subtotals
            $unitPriceWithoutIva = $product->price_without_iva;
            $ivaPercentage = $product->iva_percentage;
            $subtotalWithoutIva = round($unitPriceWithoutIva * $quantity, 2);
            $subtotalIva = round($subtotalWithoutIva * ($ivaPercentage / 100), 2);
            $subtotalWithIva = round($subtotalWithoutIva + $subtotalIva, 2);

            // 3 Create OrderLine
            $orderLine = OrderLine::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $quantity,
                'unit_price_without_iva' => $unitPriceWithoutIva,
                'iva_percentage' => $ivaPercentage,
                'subtotal_without_iva' => $subtotalWithoutIva,
                'subtotal_iva' => $subtotalIva,
                'subtotal_with_iva' => $subtotalWithIva,
            ]);

            // 4 POST CREATE: Decrease Stock and Recalculate order totals
            $this->productService->decreaseStock($product, $quantity);
            $this->orderService->recalculateTotals($order);

            return $orderLine;
        });
    }

    /**
     * Updates an existing OrderLine
     * 
     * Only quantity is allowed to change. If product is incorrect, deleteOrderLine() and addOrderLine().
     * 
     * Checks Product stock is valid, change Product stock and recalculate Order totals
     * 
     * @param OrderLine $orderLine
     * @param int $newQuantity
     * @throws RuntimeException
     * @return OrderLine
     */
    public function updateOrderLine(OrderLine $orderLine, int $newQuantity): OrderLine {
        if ($newQuantity <= 0) {
            throw new RuntimeException("La cantidad debe ser mayor que cero");
        }

        return DB::transaction(function() use ($orderLine, $newQuantity) {
            $product = Product::lockForUpdate()->findOrFail($orderLine->product_id);
            $oldQuantity = $orderLine->quantity;
            $diff = $newQuantity - $oldQuantity;
            
            // 1 Check if there is enough product stock
            $this->productService->checkStock($product, $diff);

            // 2 Recalculate Subtotals (use the storage prices for product, not the current ones)
            $subtotalWithoutIva = round($orderLine->unit_price_without_iva * $newQuantity, 2);
            $subtotalIva = round($subtotalWithoutIva * ($orderLine->iva_percentage / 100), 2);
            $subtotalWithIva = round($subtotalWithoutIva + $subtotalIva, 2);

            $orderLine->quantity = $newQuantity;
            $orderLine->subtotal_without_iva = $subtotalWithoutIva;
            $orderLine->subtotal_iva = $subtotalIva;
            $orderLine->subtotal_with_iva = $subtotalWithIva;
            $orderLine->save();

            // 3 Adjust Stock based on $diff
            if ($diff > 0) {
                $this->productService->decreaseStock($product, abs($diff));
            } elseif ($diff < 0) {
                $this->productService->increaseStock($product, abs($diff));
            }

            // 4 Recalculates Totals on Order
            $this->orderService->recalculateTotals($orderLine->order);

            return $orderLine;
        });
    }

    /**
     * Removes an OrderLine
     * 
     * Returns the OrderLine quantity to the Product stock
     * 
     * Recalculate Order totals
     * 
     * @param OrderLine $orderLine
     * @return void
     */
    public function removeOrderLine(OrderLine $orderLine): void {
        DB::transaction(function () use ($orderLine) {
            $product = Product::lockForUpdate()->findOrFail($orderLine->product_id);
            $order = $orderLine->order;
            $quantity = $orderLine->quantity;

            $orderLine->delete();

            $this->productService->increaseStock($product, $quantity);
            $this->orderService->recalculateTotals($order);    
        });
    }
}