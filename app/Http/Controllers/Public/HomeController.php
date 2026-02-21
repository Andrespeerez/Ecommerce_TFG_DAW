<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index() {
        $mostSelled = Product::where('active', true)
                        ->withCount('orderLines')
                        ->orderBy('order_lines_count', 'desc')
                        ->take(3)
                        ->get();

        return Inertia::render('Public/Home', [
            'mostSelled' => $mostSelled,
        ]);
    }
}
