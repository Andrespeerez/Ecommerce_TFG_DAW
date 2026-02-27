<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Show the Landing page view.
     * 
     * Includes mostSelled products
     * 
     * @return \Inertia\Response
     */
    public function index() {
        $mostSelled = Cache::remember('mostSelled', 3600, function() {
            return Product::where('active', true)
                        ->withCount('orderLines')
                        ->orderBy('order_lines_count', 'desc')
                        ->take(3)
                        ->get();
        });

        return Inertia::render('Public/Home', [
            'mostSelled' => $mostSelled,
        ]);
    }
}
