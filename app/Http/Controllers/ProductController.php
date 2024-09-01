<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Product::query()->latest();

        if ($request->search) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q
                    ->where('name', 'like', '%' . $search . '%')
                    ->orWhere('price', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            });
        }

        $products = $query->paginate($request->perpage ?? 8)->withQueryString();

        return Inertia::render('admin/product/index', compact('products'));
    }

    public function store(Request $request): RedirectResponse
    {

        $request->validate([
            'name' => 'required',
            'price' => 'required|integer',
            'description' => 'nullable',
        ]);

        $product = new Product();


        $product->name = $request->name;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->save();

        return redirect()->route('product.index')->with('success', 'Paket Barber Berhasil Ditambahkan');
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|integer',
            'description' => 'nullable',
        ]);

        $product = Product::find($id);

        $product->name = $request->name;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->save();

        return redirect()->route('product.index')->with('success', 'Paket Barber Berhasil Diperbarui');
    }

    public function destroy(int $id): RedirectResponse
    {
        $product = Product::find($id);
        $product->delete();

        return redirect()->route('product.index')->with('success', 'Paket Barber Berhasil Dihapus');
    }
}
