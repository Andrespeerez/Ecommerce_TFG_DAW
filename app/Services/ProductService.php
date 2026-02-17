<?php

namespace App\Services;

use App\Models\Product;
use RuntimeException;

/**
 * Implement the Business Logic for Product.
 */
class ProductService {

    /**
     * Validates that a product has valid stock, price and IVA values.
     * 
     * In case there is non valid value, throws a RuntimeException.
     * 
     * @param Product $product
     * @throws RuntimeException
     * @return void
     */
    public function validateProduct(Product $product): void {
        if ($product->stock < 0) {
            throw new RuntimeException("El stock del producto '{$product->name}' no puede ser negativo.");
        }

        if ($product->price_without_iva <= 0) {
            throw new RuntimeException("El precio del producto '{$product->name}' debe ser mayor que cero.");
        }

        if ($product->iva_percentage <= 0) {
            throw new RuntimeException("El IVA del producto '{$product->name}' debe ser mayor que cero.");
        }
    }

    /**
     * Decrease the stock of a product by a given amount.
     * 
     * If there is not enough stock, throws a RuntimeException.
     * 
     * @param Product $product
     * @param int $quantity
     * @throws RuntimeException
     * @return void
     */
    public function decreaseStock(Product $product, int $quantity) : void {
        $this->checkStock($product, $quantity);

        $product->stock -= $quantity;
        $product->save();
    }

    /**
     * Check if there is enough stock, throws RuntimeException if there is not enough.
     * @param Product $product
     * @param int $quantity
     * @throws RuntimeException
     * @return void
     */
    public function checkStock(Product $product, int $quantity): void {
        if ($product->stock < $quantity) {
            throw new RuntimeException("Stock insuficiente para '{$product->name}'. Disponible: {$product->stock}.");
        }
    }

    /**
     * Increase the stock of a product by a given amount.
     * @param Product $product
     * @param int $quantity
     * @return void
     */
    public function increaseStock(Product $product, int $quantity): void {
        $product->stock += $quantity;
        $product->save();
    }
}