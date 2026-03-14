<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as AuthenticateMiddleware;
use Illuminate\Http\Request;

class Authenticate extends AuthenticateMiddleware
{
    /**
     * Overwrites the rediredTo Funciont of the original Authenticate function
     * 
     * sets a session variable that we can use to set open the login modal 
     * 
     * @param Request $request
     * @return string|null
     */
    protected function redirectTo(Request $request): ?string
    {
        session()->flash('openLoginModal', true);

        return route('home.index');
    }
}