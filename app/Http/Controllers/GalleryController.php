<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\File;


class GalleryController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Gallery::query()->latest();

        if ($request->search) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%');
            });
        }

        $galleries = $query->paginate($request->perpage ?? 8)->withQueryString();

        return Inertia::render('admin/gallery/index', compact('galleries'));
    }

    public function store(Request $request): RedirectResponse
    {

        $request->validate([
            'name' => 'required',
            'photo' => 'required|image|max:2048',
        ]);

        $gallery = new Gallery();

        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $new_name = time() . '.' . rand() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('galleries'), $new_name);
            $gallery->photo = $new_name;
        }

        $gallery->name = $request->name;
        $gallery->save();

        return redirect()->route('gallery.index')->with('success', 'Gallery Foto Berhasil Ditambahkan');
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'name' => 'required',
        ]);

        $gallery = Gallery::find($id);

        if ($request->hasFile('photo')) {
            $request->validate([
                'photo' => 'image|max:2048',
            ]);

            File::delete(public_path('galleries/' . basename($gallery->photo)));

            $image = $request->file('photo');
            $new_name = time() . '.' . rand() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('galleries'), $new_name);
            $gallery->photo = $new_name;
        }

        $gallery->name = $request->name;
        $gallery->save();

        return redirect()->route('gallery.index')->with('success', 'Gallery Foto Berhasil Diperbarui');
    }

    public function destroy(int $id): RedirectResponse
    {
        $gallery = Gallery::find($id);

        File::delete(public_path('galleries/' . basename($gallery->photo)));
        $gallery->delete();

        return redirect()->route('gallery.index')->with('success', 'Gallery Foto Berhasil Dihapus');
    }
}
