<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\File;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $query = User::query()->latest();

        if ($request->search) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q
                    ->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%');
            });
        }

        $query->orderBy('role', 'asc');

        $users = $query->paginate($request->perpage ?? 8)->withQueryString();

        return Inertia::render('admin/user/index', compact('users'));
    }

    public function store(Request $request): RedirectResponse
    {

        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:8',
            'phone' => 'required',
            'role' => 'required|in:admin,user',
            'photo' => 'required|image|max:2048',
        ]);

        $user = new User();

        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $new_name = time() . '.' . rand() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('avatars'), $new_name);
            $user->photo = $new_name;
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->role = $request->role;
        $user->password = bcrypt($request->password);
        $user->email_verified_at = now();
        $user->save();

        return redirect()->route('user.index')->with('success', 'Admin Berhasil Ditambahkan');
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $id,
            'phone' => 'required',
            'role' => 'required|in:admin,user',
        ]);

        $user = User::find($id);

        if ($request->hasFile('photo')) {
            $request->validate([
                'photo' => 'image|max:2048',
            ]);

            File::delete(public_path('avatars/' . basename($user->photo)));

            $image = $request->file('photo');
            $new_name = time() . '.' . rand() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('avatars'), $new_name);
            $user->photo = $new_name;
        }

        if ($request->password) {
            $request->validate([
                'password' => 'confirmed|min:8',

            ]);
            $user->password = bcrypt($request->password);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->role = $request->role;
        $user->save();

        return redirect()->route('user.index')->with('success', 'Admin Berhasil Diperbarui');
    }

    public function destroy(int $id): RedirectResponse
    {
        $user = User::find($id);

        File::delete(public_path('avatars/' . basename($user->photo)));
        $user->delete();

        return redirect()->route('user.index')->with('success', 'Admin Berhasil Dihapus');
    }
}
