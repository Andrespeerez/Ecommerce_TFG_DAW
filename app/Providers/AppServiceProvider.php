<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
            
            \Illuminate\Pagination\Paginator::currentPathResolver(function () {
            return str_replace('http://', 'https://', request()->url());
        });
        }

        Vite::prefetch(concurrency: 3);
    }
}
