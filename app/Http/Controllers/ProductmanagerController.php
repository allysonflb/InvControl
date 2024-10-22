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
        return response()->json(['debug' => $produtos]);
    }

    // Método para atualizar um produto
    public function update(Request $request, $id)
    {
        $product = Products::find($id);

        if (!$product) {
            return response()->json(['message' => 'Produto não encontrado.'], 404);
        }

        $product->update($request->only('nome', 'preco', 'quantidade', 'descricao'));

        return response()->json([
            'message' => 'Produto atualizado com sucesso!',
            'product' => $product,
        ], 200);
    }

    // Método para deletar um produto
    public function destroy($id)
    {
        $product = Products::find($id);

        if (!$product) {
            return response()->json(['message' => 'Produto não encontrado.'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Produto deletado com sucesso!'], 200);
    }
};