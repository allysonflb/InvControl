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

        $produtos = $produtos->map(function ($produto, $index) {
            $produto->id_real = $produto->id;
            $produto->id = $index + 1;
            return $produto;
        });
        
        return response()->json(['Produtos:' => $produtos]);
    }

    public function produtosCreate(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'preco' => 'required|numeric|min:0', 
            'quantidade' => 'required|numeric|min:0', 
            'descricao' => 'required|string|max:1000', 
        ]);

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
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'preco' => 'required|numeric|min:0', 
            'quantidade' => 'required|numeric|min:0', 
            'descricao' => 'required|string|max:1000', 
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error na validação do json',
                'errors' => $validator->errors()
            ], 422);
        }
        try {
            $produto = Products::findOrFail($id);
            $produto->nome = $request->nome;
            $produto->preco = $request->preco;
            $produto->quantidade = $request->quantidade;
            $produto->descricao = $request->descricao;
            $produto->save();
        
            return response()->json(['Produto atualizado:' => $produto]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Falha ao atualizar produto.',
                'error' => $e->getMessage()
            ], 500);
        }
    }    

    public function produtosDelete($id): JsonResponse
    {
        $produto = Products::findOrFail($id);
        $produto->delete();
    
        $responseData = [
            'id' => $produto->id,
            'nome' => $produto->nome,
            'preco' => number_format($produto->preco, 2, '.', ''),
            'quantidade' => $produto->quantidade,
            'descricao' => $produto->descricao,
        ];
    
        return response()->json(['Produto deletado:' => $responseData]);
    }

    public function produtosZero(): JsonResponse
    {
        $produtos = Products::where('quantidade', 0)->get();

        $produtos = $produtos->map(function ($produto, $index) {
            $produto->id_real = $produto->id;
            $produto->id = $index + 1;
            return $produto;
        });
        
        return response()->json(['Produtos:' => $produtos]);
    }

};