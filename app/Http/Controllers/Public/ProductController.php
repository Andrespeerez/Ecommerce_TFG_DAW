<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Finish;
use App\Models\Material;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Show catalog of products. Filter items by params
     * 
     * URL Params:
     * - categories[]
     * - materials[]
     * - finishes[]
     * - price_max
     * - price_min
     * - search
     * 
     * @return \Inertia\Response
     */
    public function index(Request $request) {
        // search "Una mesa de roble macizo"
        // array "una", "mesa", "de", "roble", "macizo"
        // words with meaning: "mesa", "roble", "macizo"
        // search LIKE mesa AND LIKE roble AND LIKE macizo
        $uselessWords = ['de', 'la', 'lo', 'el', 'los', 'las', 'un', 'una', 'y', 'en', 'a'];

        $searchArray = explode(' ', trim(strtolower(strip_tags($request->search)))); // separete words
        $searchArray = array_diff($searchArray, $uselessWords); // remove words without meaning

        // Filter products
        /*
        Query:
        select * from products where active=true AND
                category_id={cat1} OR category_id={cat2} ... AND
                material_id={mat1} OR material_id={mat2} ... AND
                finish_id={fin1} OR finish_id={fin2} ... AND
                price_with_iva >= {price_min} AND
                price_with_iva <= {price_max} AND
                name LIKE %{search}%

        When method:
        https://medium.com/@zulfikarditya/laravels-when-method-a-comprehensive-guide-54fe6ae68e90
        */
        $products = Product::where('active', true)
                    ->when($request->categories, fn($q, $v) => $q->whereIn('category_id', $v))
                    ->when($request->materials, fn($q, $v) => $q->whereIn('material_id', $v))
                    ->when($request->finishes, fn($q, $v) => $q->whereIn('finish_id', $v))
                    ->when($request->price_max, fn($q, $v) => $q->where('price_with_iva', '<=', $v))
                    ->when($request->price_min, fn($q, $v) => $q->where('price_with_iva', '>=', $v))
                    ->when(!empty($searchArray), fn($q) => $this->applySearchFilter($q, $searchArray))
                    ->with(['category', 'material', 'finish'])
                    ->paginate(6)
                    ->appends($request->only(['categories', 'materials', 'finishes', 'price_min', 'price_max', 'search'])); 

        return Inertia::render('Public/Products', [
            'products' => $products,
            'categories' => Category::where('active', true)->get(),
            'materials' => Material::where('active', true)->get(),
            'finishes' => Finish::where('active', true)->get(),
            'filters'    => $request->only(['categories', 'materials', 'finishes', 'price_min', 'price_max', 'search']),
        ]);
    }

    public function show(Request $request, int $id) {
        $product = Product::findOrFail($id);

        return Inertia::render('Public/ProductDetails', [
            'product' => $product,
        ]);
    }

    /**
     * Apply a search filter for each word on an arrya
     * @param mixed $query
     * @param array $words - Array of words to search
     * @return void
     */
    private function applySearchFilter($query, array $words) {
        $query->where(function($q) use ($words) {
            foreach ($words as $word) {
                $q->where('name', 'like', "%$word%");
            }
        });
    }
}
