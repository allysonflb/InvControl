<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function Reset_senha_usuario_existe()
    {
        // Cria um usuário com um email específico
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('old_password'),
        ]);

        // Define os dados da requisição
        $response = $this->postJson('/forgot-password', [
            'email' => 'test@example.com',
        ]);

        // Verifica se a resposta é a esperada
        $response->assertStatus(Response::HTTP_CREATED)
                 ->assertJson(['status' => 'Senha resetada para o default']);

        // Verifica se a senha foi atualizada para o padrão "1234"
        $this->assertTrue(Hash::check('1234', $user->fresh()->password));
    }

    /** @test */
    public function Falha_usuario_nao_existe()
    {
        // Define um email que não corresponde a nenhum usuário
        $response = $this->postJson('/forgot-password', [
            'email' => 'nonexistent@example.com',
        ]);

        // Verifica se a resposta é a esperada
        $response->assertStatus(Response::HTTP_NOT_FOUND)
                 ->assertJson(['error' => 'Usuario não encontrado']);
    }
}
