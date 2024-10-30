<?php

namespace Tests\Feature\Auth;

use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function Autentica_Usuario()
    {
        // Cria um usuário com um email e senha específicos
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        // Define os dados da requisição de login
        $loginData = [
            'email' => 'test@example.com',
            'password' => 'password123',
        ];

        // Faz a requisição de login
        $response = $this->postJson('/login', $loginData);

        // Verifica se a resposta é a esperada
        $response->assertStatus(Response::HTTP_OK)
                 ->assertJson(['message' => 'Login successful']);

        // Verifica se o usuário está autenticado
        $this->assertTrue(Auth::check());
    }

    /** @test */
    public function Usuario_Logout()
    {
        // Cria um usuário e autentica
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        $this->actingAs($user);

        // Faz a requisição de logout
        $response = $this->postJson('/logout');

        // Verifica se a resposta é a esperada
        $response->assertStatus(Response::HTTP_NO_CONTENT);

        // Verifica se o usuário não está mais autenticado
        $this->assertFalse(Auth::check());
    }
}
