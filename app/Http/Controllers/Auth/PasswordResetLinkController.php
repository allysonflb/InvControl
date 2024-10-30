<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class PasswordResetLinkController extends Controller
{
    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        // Busca o usuário com o email fornecido
        $user = User::where('email', $request->input('email'))->first();
    
        if (!$user) {
            return response()->json(['error' => 'Usuario não encontrado'], 404);
        }
    
        // Atualiza a senha do usuário para o padrão "1234"
        $user->password = Hash::make('1234');
        $user->save();
    
        // Retorna uma resposta confirmando a alteração
        return response()->json(['status' => 'Senha resetada para o default'], 201);
    }
}
