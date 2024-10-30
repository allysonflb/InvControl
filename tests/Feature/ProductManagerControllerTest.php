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
        // Cria alguns produtos para serem listados
        Products::factory()->count(3)->create();

        // Faz uma requisição ao método produtosList
        $response = $this->getJson('/api/produtos');

        // Verifica o status e a estrutura da resposta
        $response->assertStatus(200);
        $response->assertJsonStructure(['Produtos:' => [['id', 'nome', 'preco', 'quantidade', 'descricao']]]);
    }

    /** @test */
    public function Criacao_de_produto_com_data_valido()
    {
        $data = [
            'nome' => 'Produto Exemplo',
            'preco' => '249.99', // Mantenha como string
            'quantidade' => 10,
            'descricao' => 'Descrição do produto exemplo'
        ];

        // Faz uma requisição POST ao método produtosCreate com dados válidos
        $response = $this->postJson('/api/produtosCreate', $data);

        // Verifica se o produto foi criado com sucesso
        $response->assertStatus(200); // O status deve ser 200 se o produto foi criado com sucesso

        // Verifica se o JSON retornado contém os dados do produto
        $response->assertJsonFragment([
            'Produto criado:' => [
                'nome' => 'Produto Exemplo',
                'preco' => '249.99', // Manter como string
                'quantidade' => 10,
                'descricao' => 'Descrição do produto exemplo',
                'id' => $response->json('Produto criado:')['id'] // Verifique se o ID está presente
            ]
        ]);

        // Verifica se o produto existe no banco de dados
        $this->assertDatabaseHas('produtos', [
            'nome' => 'Produto Exemplo',
            'preco' => '249.99', // Manter como string
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

        // Faz uma requisição POST ao método produtosCreate com dados inválidos
        $response = $this->postJson('/api/produtosCreate', $data);

        // Verifica se a resposta contém erros de validação
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

        // Faz uma requisição PUT ao método produtosUpdate com dados válidos
        $response = $this->putJson("/api/produtosUpdate/{$produto->id}", $data);

        // Verifica se o produto foi atualizado com sucesso
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

        // Faz uma requisição PUT ao método produtosUpdate com dados inválidos
        $response = $this->putJson("/api/produtosUpdate/{$produto->id}", $data);

        // Verifica se a resposta contém erros de validação
        $response->assertStatus(422);
        $response->assertJsonStructure(['status', 'message', 'errors']);
    }

    /** @test */
    public function DeletarProduto()
    {
        // Cria um produto que será deletado
        $produto = Products::create([
            'nome' => 'Produto Exemplo',
            'preco' => 249.99,
            'quantidade' => 10,
            'descricao' => 'Descrição do produto exemplo',
        ]);

        // Faz uma requisição DELETE ao método para deletar o produto
        $response = $this->deleteJson("/api/produtosDelete/{$produto->id}");

        // Verifica se o produto foi deletado com sucesso
        $response->assertStatus(200);
        $response->assertJsonFragment([
            'Produto deletado:' => [
                'id' => $produto->id,
                'nome' => $produto->nome,
                'preco' => number_format($produto->preco, 2, '.', ''), // Formata para string com duas casas decimais
                'quantidade' => $produto->quantidade,
                'descricao' => $produto->descricao,
                // Não incluir data_criacao, pois é gerenciado automaticamente
            ],
        ]);

        // Verifica se o produto não existe mais no banco de dados
        $this->assertDatabaseMissing('produtos', ['id' => $produto->id]);
    }
}
