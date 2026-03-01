<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $nonce = $nonce = \Str::random(40);
        view()->share('csp_nonce', $nonce);

        $response = $next($request);

        $response->headers->set('X-Frame-Options', 'DENY');

        $response->headers->set('X-Content-Type-Options', 'nosniff');

        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        $response->headers->set('Cross-Origin-Opener-Policy', 'same-origin');

        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

        if (App::environment('production')) {
            $csp = "default-src 'self'; " .
                   "script-src 'self' 'nonce-$nonce'; " . 
                   "style-src 'self' 'unsafe-inline'; " .
                   "img-src 'self' data: https://ecommerce-tfgdaw-production.up.railway.app; " .
                   "connect-src 'self'; " .
                   "upgrade-insecure-requests;";

            $response->headers->set('Content-Security-Policy', $csp);
        }

        return $response;
    }
}
