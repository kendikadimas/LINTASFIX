<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Menampilkan formulir profil pengguna.
     * Halaman ini akan merender komponen React 'Profile/Edit.jsx'.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            // Memastikan pengguna harus memverifikasi email jika implementasi 'MustVerifyEmail' ada di model User
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            // Mengirim status sesi, berguna untuk menampilkan pesan sukses
            'status' => session('status'),
        ]);
    }

    /**
     * Memperbarui informasi profil pengguna.
     * Logika ini akan dijalankan saat pengguna menekan tombol "Save" di form profil.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        // Mengisi model User dengan data yang sudah divalidasi dari ProfileUpdateRequest
        $request->user()->fill($request->validated());

        // Jika pengguna mengubah alamat email mereka, reset tanggal verifikasi email.
        // Ini akan mengharuskan mereka untuk memverifikasi email baru.
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        // Menyimpan perubahan ke database
        $request->user()->save();

        // Mengarahkan pengguna kembali ke halaman edit profil dengan pesan sukses.
        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Menghapus akun pengguna secara permanen.
     */
    public function destroy(Request $request): RedirectResponse
    {
        // Validasi untuk memastikan password yang dimasukkan benar sebelum menghapus akun.
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        // Logout pengguna dari sesi saat ini
        Auth::logout();

        // Menghapus data pengguna dari database
        $user->delete();

        // Menghapus sesi pengguna dan meregenerasi token untuk keamanan
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Mengarahkan pengguna ke halaman utama setelah akun dihapus.
        return Redirect::to('/');
    }
}