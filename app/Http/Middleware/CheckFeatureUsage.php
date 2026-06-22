<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckFeatureUsage
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $user->subscribed('default')) {
            return $next($request);
        }

        $usageCount = $user->transactions()
            ->where('status', 'pending_review')
            ->count();

        if ($usageCount >= 1) {
            return response()->json([
                'success' => false,
                'requires_subscription' => true,
                'message' => 'Has agotado tus 5 escaneos gratuitos de demostración. Suscríbete a Dedux Pro para obtener acceso ilimitado.'
            ], 403);
        }

        return $next($request);
    }
}
