<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Products;
use DateTime;
use Illuminate\Http\JsonResponse;

class ProductManagerControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function Listagem_todos_produtos()
    {
        Products::factory()->count(3)->create();

        $response = $this->getJson('/api/produtos');

        $response->assertStatus(200);
        $response->assertJsonStructure(['Produtos:' => [['id', 'nome', 'preco', 'quantidade', 'descricao']]]);
    }

    /** @test */
    public function Criacao_de_produto_com_data_valido()
    {
        $data = [
            'nome' => 'Produto Exemplo',
            'preco' => '249.99',
            'quantidade' => 10,
            'descricao' => 'Descrição do produto exemplo'
        ];

        $response = $this->postJson('/api/produtosCreate', $data);

        $response->assertStatus(200);

        $response->assertJsonFragment([
            'Produto criado:' => [
                'nome' => 'Produto Exemplo',
                'preco' => '249.99',
                'quantidade' => 10,
                'descricao' => 'Descrição do produto exemplo',
                'id' => $response->json('Produto criado:')['id']
            ]
        ]);

        $this->assertDatabaseHas('produtos', [
            'nome' => 'Produto Exemplo',
            'preco' => '249.99',
            'quantidade' => 10,
            'descricao' => 'Descrição do produto exemplo'
        ]);
    }






    /** @test */
    public function Criacao_de_produto_com_data_invalido()
    {
        $data = [
            'nome' => '',
            'preco' => -10,
            'quantidade' => -5,
            'descricao' => ''
        ];

        $response = $this->postJson('/api/produtosCreate', $data);

        $response->assertStatus(422);
        $response->assertJsonStructure(['status', 'message', 'errors']);
    }

    /** @test */
    public function Update_de_produto_com_data_valido()
    {
        $produto = Products::factory()->create();

        $data = [
            'nome' => 'Produto Atualizado',
            'preco' => 150.00,
            'quantidade' => 20,
            'descricao' => 'Descrição atualizada'
        ];

        $response = $this->putJson("/api/produtosUpdate/{$produto->id}", $data);

        $response->assertStatus(200);
        $response->assertJsonFragment(['nome' => 'Produto Atualizado']);
        $this->assertDatabaseHas('produtos', array_merge(['id' => $produto->id], $data));
    }

    /** @test */
    public function Update_de_produto_com_data_invalido()
    {
        $produto = Products::factory()->create();

        $data = [
            'nome' => '',
            'preco' => -50,
            'quantidade' => -10,
            'descricao' => ''
        ];

        $response = $this->putJson("/api/produtosUpdate/{$produto->id}", $data);

        $response->assertStatus(422);
        $response->assertJsonStructure(['status', 'message', 'errors']);
    }

    /** @test */
    public function DeletarProduto()
    {
        $produto = Products::create([
            'nome' => 'Produto Exemplo',
            'preco' => 249.99,
            'quantidade' => 10,
            'descricao' => 'Descrição do produto exemplo',
        ]);

        $response = $this->deleteJson("/api/produtosDelete/{$produto->id}");

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'Produto deletado:' => [
                'id' => $produto->id,
                'nome' => $produto->nome,
                'preco' => number_format($produto->preco, 2, '.', ''), 
                'quantidade' => $produto->quantidade,
                'descricao' => $produto->descricao,
            ],
        ]);

        $this->assertDatabaseMissing('produtos', ['id' => $produto->id]);
    }
}
