<?php

use App\Http\Middleware\IsAdmin;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            \App\Http\Middleware\SecurityHeaders::class,
        ]);

        $middleware->trustProxies(at: '*');

        // Middleware aliases
        $middleware->alias([
            'admin' => IsAdmin::class,
            'password.confirm' => \App\Http\Middleware\RequirePassword::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // NotFoundHttpException --> render NotFound.jsx
        $exceptions->render(function (NotFoundHttpException $e, $request) {
            return Inertia::render('Errors/NotFound')->toResponse($request)->setStatusCode(404);
        });

        // ThrottleRequestException --> returns flash 'error' (to be rendered by Notification.jsx)
        $exceptions->render(function (ThrottleRequestsException $e, $request) {
        if ($request->header('X-Inertia')) {
            return back()->with('error', 'Demasiados intentos. Por favor, espera un momento antes de volver a probar.');
        }

        return null;
    });
    
    })->create();
