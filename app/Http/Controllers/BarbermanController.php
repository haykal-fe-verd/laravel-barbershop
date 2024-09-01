<?php

namespace App\Http\Controllers;

use App\Models\Barberman;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BarbermanController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Barberman::query()->latest();

        if ($request->search) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q
                    ->where('name', 'like', '%' . $search . '%')
                    ->orWhere('status', 'like', '%' . $search . '%');
            });
        }

        $barbermans = $query->paginate($request->perpage ?? 8)->withQueryString();

        return Inertia::render('admin/barberman/index', compact('barbermans'));
    }

    public function store(Request $request): RedirectResponse
    {

        $request->validate([
            'name' => 'required',
            'status' => 'required|in:online,offline',
            'photo' => 'required|image|max:2048',
        ]);

        $barberman = new Barberman();

        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $new_name = time() . '.' . rand() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('barbermans'), $new_name);
            $barberman->photo = $new_name;
        }

        $barberman->name = $request->name;
        $barberman->status = $request->status;
        $barberman->save();

        return redirect()->route('barberman.index')->with('success', 'Barberman Berhasil Ditambahkan');
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'status' => 'required',
        ]);

        $barberman = Barberman::find($id);

        if ($request->hasFile('photo')) {
            $request->validate([
                'photo' => 'image|max:2048',
            ]);

            File::delete(public_path('barbermans/' . basename($barberman->photo)));

            $image = $request->file('photo');
            $new_name = time() . '.' . rand() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('barbermans'), $new_name);
            $barberman->photo = $new_name;
        }

        $barberman->name = $request->name;
        $barberman->status = $request->status;
        $barberman->save();

        return redirect()->route('barberman.index')->with('success', 'Barberman Berhasil Diperbarui');
    }

    public function destroy(int $id): RedirectResponse
    {
        $barberman = Barberman::find($id);

        File::delete(public_path('barbermans/' . basename($barberman->photo)));
        $barberman->delete();

        return redirect()->route('barberman.index')->with('success', 'Barberman Berhasil Dihapus');
    }

    public function barberman_user(): Response
    {
        $barbermans = Barberman::all();

        return Inertia::render('user/barberman/index', compact('barbermans'));
    }
}
