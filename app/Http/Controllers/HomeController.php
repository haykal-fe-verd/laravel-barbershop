<?php

namespace App\Http\Controllers;

use App\Models\Barberman;
use App\Models\Gallery;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $products = Product::take(4)->get();
        $barbermans = Barberman::take(4)->get();
        $galleries = Gallery::all();

        return Inertia::render('home/index', compact('products', 'barbermans', 'galleries'));
    }
}
