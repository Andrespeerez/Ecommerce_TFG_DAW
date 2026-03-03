<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" type="image/svg+xml" href="/assets/images/logo2.svg">

        <link rel="preload" as="image" href="/assets/images/logo2.svg" fetchpriority="high" type="image/svg+xml">
        <link rel="preload" as="image" href="/assets/images/categories.svg" fetchpriority="high" type="image/svg+xml">
        <link rel="preload" as="image" href="/assets/images/search.svg" fetchpriority="high" type="image/svg+xml">
        <link rel="preload" as="image" href="/assets/images/login.svg" fetchpriority="high" type="image/svg+xml">
        <link rel="preload" as="image" href="/assets/images/cart.svg" fetchpriority="high" type="image/svg+xml">

        <!-- Scripts -->
        @routes
        @viteReactRefresh

        @if(Route::currentRouteName() === 'home.index')
            <link rel="preload" as="image" href="/assets/images/hero.webp" fetchpriority="high" type="image/webp">
        @endif

        @if($page['component'] === 'Errors/Construction')
            <link rel="preload" as="image" href="/assets/images/under-construction.webp" fetchpriority="high" type="image/webp">
        @endif        
        
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
