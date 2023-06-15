<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/dashboard';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        $this->configureRateLimiting();

        ResetPassword::createUrlUsing(function ($user, string $token) {
            $resetUrl = url(config('app.url') . '/auth/password-reset/' . $token); // use the config('app.url') to get the app URL
            $parsedUrl = parse_url($resetUrl);
            $parsedUrl['port'] = 3000; // change the port number
            $url = $parsedUrl['scheme'] . '://' . $parsedUrl['host'] . ':' . $parsedUrl['port'] . $parsedUrl['path'];
            if (isset($parsedUrl['query'])) {
                $url .= '?' . $parsedUrl['query'];
            }
            return $url;
        });

        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }

    /**
     * Configure the rate limiters for the application.
     */
    protected function configureRateLimiting(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}
