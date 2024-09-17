<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\View\View;
use App\Models\Products;


class ProductManagerController extends Controller
{
    public function produtosList(Request $request): JsonResponse
    {
        $produtos = Products::all();
        return response()->json($produtos);
    }
};