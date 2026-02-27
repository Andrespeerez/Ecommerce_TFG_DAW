<?php

use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\CartController;
use App\Http\Controllers\Public\CheckoutController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// This one is just to test pages
Route::get('/test', function() {
    return Inertia::render('Public/Home', [
        'cart' => [
            'total_items' => 10,
        ],
    ]);
});

Route::get('/', [HomeController::class, 'index'])->name('home.index');
Route::get('/tienda', [ProductController::class, 'index'])->name('products.index');
Route::get('/productos/{id}', [ProductController::class, 'show'])->name('products.show');
Route::post('/cart/add/{id}', [CartController::class, 'add'])->name('cart.add');
Route::post('/cart/decrease/{id}', [CartController::class, 'decrease'])->name('cart.decrease');
Route::delete('/cart/remove/{id}', [CartController::class, 'remove'])->name('cart.remove');

Route::middleware('auth')->group(function () {
    /*
    middleware('throttle:1,2')  :  For each user, allow only 1 request each 2 minuts to this enpoint

    This middleware must to be applied to:
    - Changes on the data base
    - Checkouts
    - Logins, registers
    */


    Route::get('/area-cliente', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/area-cliente/pedidos', [ProfileController::class, 'orders'])->name('profile.orders');
    Route::patch('/area-cliente/email', [ProfileController::class, 'updateEmail'])->middleware('throttle:4,1')->name('profile.update.email')->middleware('password.confirm');
    Route::patch('/area-cliente/password', [ProfileController::class, 'updatePassword'])->middleware('throttle:4,1')->name('profile.update.password');
    Route::patch('/area-cliente/info', [ProfileController::class, 'updateInfo'])->middleware('throttle:4,1')->name('profile.update.info');
    Route::patch('/area-cliente/shipment', [ProfileController::class, 'updateShipment'])->middleware('throttle:4,1')->name('profile.update.shipment')->middleware('password.confirm');
    Route::delete('/area-cliente', [ProfileController::class, 'destroy'])->name('profile.destroy')->middleware('password.confirm');

    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store')->middleware('throttle:4,1');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Test if you are admin
    Route::get('/hello', function() {
        return "Eres admin";
    });

    Route::resource('productos', AdminProductController::class)
        ->parameters(['productos' => 'product'])
        ->names('products');
});


require __DIR__.'/auth.php';
