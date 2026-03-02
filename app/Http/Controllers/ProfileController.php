<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Order;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function orders(Request $request) {
        $orders = Order::where("user_id", $request->user()->id)
            ->with(['orderLines.product'])
            ->orderBy('order_number', 'desc')
            ->paginate(6);

        return Inertia::render('Public/UserOrders', [
            'orders' => $orders,
        ]);
    }

    /**
     * Show a Profile View to edit User data (table users)
     * @param Request $request
     * @return \Inertia\Response
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Public/UserProfile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Updates user Email
     * @param Request $request
     * @return RedirectResponse
     */
    public function updateEmail(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255|unique:users,email,' . $request->user()->id,
        ]);

        $user = $request->user();

        $user->email = $validated['email'];
        $user->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Updates user password
     * @param Request $request
     * @return RedirectResponse
     */
    public function updatePassword(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => 'required_with:password,email',
            'password' => ['nullable', 'confirmed', Password::defaults()],
        ]);

        $user = $request->user();

        if (!Hash::check($validated['current_password'], $user->password)) {
            return back()->withErrors(['current_password' => 'La contraseña actual no es correcta.']);
        }

        $user->password = Hash::make($validated['password']);
        $user->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Updates user info (full_name, phone)
     * @param Request $request
     * @return RedirectResponse
     */
    public function updateInfo(Request $request): RedirectResponse 
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:15',
        ]);

        $request->user()->update($validated);

        return Redirect::route('profile.edit');
    }

    /**
     * Updates user data for Shipment
     * @param Request $request
     * @return RedirectResponse
     */
    public function updateShipment(Request $request): RedirectResponse 
    {
        $validated = $request->validate([
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'province' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|regex:/^\d{5}$/',
        ]);

        $request->user()->update($validated);

        return Redirect::route('profile.edit');
    }

    /**
     * Soft delete an user (active = false)
     * 
     * @param Request $request
     * @return RedirectResponse
     */
    public function destroy(Request $request): RedirectResponse
    {

        $user = $request->user();

        // Soft Delete
        $user->active = false;
        $user->save();

        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
