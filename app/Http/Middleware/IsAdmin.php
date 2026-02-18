<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class IsAdmin
{
    /**
     * Checks if the incomming HTTP request is done by an user with admin rol
     * 
     * @param Request $request  the HTTP request
     * @param Closure $next     the neext middleware
     * @return Response
     * @throws HttpException  403 if user is not admin
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check() && auth()->user()->role?->is_admin) {
            return $next($request);
        }

        abort(403, 'Acceso no autorizado.');
    }
}
