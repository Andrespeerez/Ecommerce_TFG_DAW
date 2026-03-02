<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\HttpFoundation\Response;

class RequirePassword
{
    /**
     * Check password confirmation
     * @param Request $request
     * @param Closure $next
     * @param mixed $redirectToRoute
     * @param mixed $passwordTimeoutSeconds
     * @return Response
     */
    public function handle(Request $request, Closure $next, ?string $redirectToRoute = null, ?int $passwordTimeoutSeconds = null): Response
    {
        $confirmedAt = $request->session()->get('auth.password_confirmed_at', 0);
        
        $timeout = $passwordTimeoutSeconds ?? config('auth.password_timeout', 10800);

        if (($confirmedAt + $timeout) < time()) {
            if ($request->header('X-Inertia')) {
                return Redirect::back()->withErrors([
                    'password_confirmed' => false,
                ]);
            }


            return redirect()->guest(route($redirectToRoute ?? 'password.confirm'));
        }

        return $next($request);
    }
}