<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Finish;
use App\Models\Material;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of Products
     * 
     * @return \Inertia\Response
     */
    public function index()
    {
        $products = Product::with(['category', 'material', 'finish'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    /**
     * Form component to create a new Product
     * 
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Products/Form', [
            'product' => null,  // null, because we want to create a new one
            'categories' => Category::where('active', true)->get(),
            'materials' => Material::where('active', true)->get(),
            'finishes' => Finish::where('active', true)->get(),
        ]);
    }

    /**
     * Store a new Product on products table
     * 
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // 1 Validate the request
        $fields = [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price_without_iva' => 'required|numeric|gt:0',
            'iva_percentage' => 'required|integer|min:1',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'material_id' => 'required|exists:materials,id',
            'finish_id' => 'required|exists:finishes,id',
            'width_cm' => 'required|numeric|min:0',
            'height_cm' => 'required|numeric|min:0',
            'depth_cm' => 'required|numeric|min:0',
            'active' => 'boolean',
        ];

        $validated = $request->validate($fields);

        // 2 Add price_with_iva field
        $validated['price_with_iva'] = $validated['price_without_iva'] * (1 + $validated['iva_percentage'] / 100);

        $validated['image_url'] = 'https://placehold.co/600x400';

        // 3 Create Product
        Product::create($validated);

        // 4 Redirect with message
        return redirect()->route('admin.productos.index')->with('success', 'Producto creado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Form component to update a Product. Recieves a product id by parameter.
     * 
     * @param int $id
     * @return \Inertia\Response
     */
    public function edit(int $id)
    {
        $product = Product::findOrFail($id);

        return Inertia::render('Admin/Products/Form', [
            'product' => $product,  // The form recieves an existing product
            'categories' => Category::where('active', true)->get(),
            'materials' => Material::where('active', true)->get(),
            'finishes' => Finish::where('active', true)->get(),
        ]);
    }

    /**
     * Updates an existing product.
     * 
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, int $id)
    {
        $product = Product::findOrfail($id);

        // 1 Validate the request
        $fields = [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price_without_iva' => 'required|numeric|gt:0',
            'iva_percentage' => 'required|integer|min:1',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'material_id' => 'required|exists:materials,id',
            'finish_id' => 'required|exists:finishes,id',
            'width_cm' => 'required|numeric|min:0',
            'height_cm' => 'required|numeric|min:0',
            'depth_cm' => 'required|numeric|min:0',
            'active' => 'boolean',
        ];

        $validated = $request->validate($fields);

        // 2 Recalculate price_with_iva
        $validated['price_with_iva'] = $validated['price_without_iva'] * (1 + $validated['iva_percentage'] / 100);

        // 3 Update the product
        $product->update($validated);

        // 4 Redirect with message
        return redirect()->route('admin.productos.index')
            ->with('success', 'Producto actualizado correctamente.');
    }

    /**
     * Remove the specified Product from storage.
     * 
     * Cannot delete products that are in OrderLines.
     * 
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(int $id)
    {
        $product = Product::findOrFail($id);

        // 1 Check if product is in any OrderLine
        if ($product->orderLines()->exists()) {
            return redirect()->route('admin.productos.index')
                ->with('error', 'No se puede eliminar un producto que está en pedidos.');
        }

        // 2 Delete the product
        $product->delete();

        // 3 Redirect with message
        return redirect()->route('admin.productos.index')
            ->with('success', 'Producto eliminado correctamente.');
    }
}
