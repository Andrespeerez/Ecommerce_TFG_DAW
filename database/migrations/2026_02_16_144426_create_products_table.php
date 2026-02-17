<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->decimal('price_without_iva', 10, 2);
            $table->integer('iva_percentage');
            $table->decimal('price_with_iva', 10, 2);
            $table->integer('stock');
            $table->string('image_url');
            $table->foreignId('category_id')->constrained('categories');
            $table->foreignId('material_id')->constrained('materials');
            $table->foreignId('finish_id')->constrained('finishes');
            $table->decimal('width_cm', 8, 2);
            $table->decimal('height_cm', 8, 2);
            $table->decimal('depth_cm', 8, 2);
            $table->boolean('active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
