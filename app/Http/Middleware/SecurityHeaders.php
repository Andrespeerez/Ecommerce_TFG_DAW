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
        $response = $next($request);

        /**
         * X-Frame-Options: DENY
         * 
         * Impide que mi web sea cargada dentro de un <iframe> en otra página
         * Un atacante puede meter mi web dentro de un iframe y correr un script que 
         * capture las teclas de teclado o clicks del ratón para robarme datos
         */
        $response->headers->set('X-Frame-Options', 'DENY');

        /**
         * X-Content-Type-Options: nosniff
         * 
         * Obliga al navegador a respetar el MIME del archivo.
         * Si un archivo contiene un script oculto en el código, el navegador lo
         * tratará como lo que indique el MIME y no ejecutará el script malicioso
         */
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        /**
         * Referrer-Policy: strict-origin-when-cross-origin
         * 
         * Evita enviar la ruta completa desde la que vienes (rutas internas) al
         * viajar a una ruta externa
         */
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        /**
         * Cross-Origin-Opener-Policy: same-origin
         * 
         * Aisla el contenido de mi web par evitar fgas de información
         */
        $response->headers->set('Cross-Origin-Opener-Policy', 'same-origin');

        /**
         * Permissions-Policy: camera=(), microphone=(), geolication()
         * 
         * Restrige el acceso a los dispositivos del usuario
         */
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

        $response->headers->set('Cache-Control', 'no-cache, private');

        /**
         * Content-Security-Policy (CSP)
         * 
         * Define que recursos puede cargar el navegador
         * (solo aplicado a producción, en localhost causan problemas) 
         */
        if (App::environment('production')) {
            $csp = "default-src 'self'; " .  // solo recursos de mi dominio
                   "script-src 'self' 'unsafe-inline'; " .  // Scripts propios y cosas de inertia/ziggy
                   "style-src 'self' 'unsafe-inline'; " .  // css mio y estilos inyectados por tailwind
                   "img-src 'self' data: https://ecommerce-tfgdaw-production.up.railway.app; " . // permite fotos que vengan de mi dominio
                   "connect-src 'self'; " . // peticiones fetch solo a mi servidor
                   "upgrade-insecure-requests;"; // todas las peticiones son convertidas a HTTPS

            $response->headers->set('Content-Security-Policy', $csp);
        }

        return $response;
    }
}
