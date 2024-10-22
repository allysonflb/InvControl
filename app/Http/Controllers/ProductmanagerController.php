<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
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
        // Validação dos dados enviados
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'preco' => 'required|numeric|min:0', // Validação para aceitar ponto decimal
            'quantidade' => 'required|numeric|min:0', // Quantidade também é numérico
            'descricao' => 'required|string|max:1000', // Descrição como string, com limite opcional de caracteres
        ]);

        // Se a validação falhar, retornar um erro
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error na validação do json',
                'errors' => $validator->errors()
            ], 422);
        }
        try {
            $produto = new Products();
            $produto->nome = $request->nome;
            $produto->preco = $request->preco;
            $produto->quantidade = $request->quantidade;
            $produto->descricao = $request->descricao;
            $produto->save();
            return response()->json(['Produto criado:' => $produto]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Falha ao salvar produto.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function produtosUpdate(Request $request, $id): JsonResponse
    {

        $produto = Products::findOrFail($id);
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