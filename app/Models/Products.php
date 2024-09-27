<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;

    protected $primaryKey = "id";  // Chave primária definida
    protected $table = "produtos"; // Nome da tabela no banco de dados

    // Desativar timestamps automáticos padrão (created_at, updated_at)
    public $timestamps = false;

    // Colunas permitidas para atribuição em massa
    protected $fillable = [
        'nome',
        'preco',
        'quantidade',
        'descricao',
    ];

    // Definir manualmente o campo de data de criação (se necessário)
    protected $casts = [
        'preco' => 'decimal:2',
        'data_criacao' => 'datetime',  // Caso queira acessar o campo como um objeto datetime
    ];
}
