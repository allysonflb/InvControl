<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\View\View;
use App\Models\Products;


class ProductManagerController extends Controller
{
    public function produtosList(): JsonResponse
    {
        $produtos = Products::all();
        return response()->json(['Produtos:' => $produtos]);
    }

    public function produtosCreate(Request $request): JsonResponse
    {
        $produto = new Products();
        $produto->nome = $request->nome;
        $produto->preco = $request->preco;
        $produto->quantidade = $request->quantidade;
        $produto->descricao = $request->descricao;
        $produto->save();
        return response()->json(['Produto criado:' => $produto]);
    }

    public function produtosUpdate(Request $request, $id): JsonResponse
    {
        $produto = Products::find($id);
        $produto->nome = $request->nome;
        $produto->preco = $request->preco;
        $produto->quantidade = $request->quantidade;
        $produto->descricao = $request->descricao;
        $produto->save();
    
        return response()->json(['Produto atualizado:' => $produto]);
    }    

    public function produtosDelete($id): JsonResponse
    {
        $produto = Products::find($id);
        $produto->delete();
        return response()->json(['Produto deletado:' => $produto]);
    }

};