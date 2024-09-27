<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProdutosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('produtos', function (Blueprint $table) {
            $table->id();  // Equivalente ao campo serial4 e PRIMARY KEY
            $table->string('nome', 255);  // Equivalente ao campo varchar(255)
            $table->decimal('preco', 10, 2);  // Equivalente ao campo numeric(10, 2)
            $table->integer('quantidade')->default(0);  // Equivalente ao campo int4 com default 0
            $table->text('descricao')->nullable();  // Equivalente ao campo text, que pode ser NULL
            $table->timestamp('data_criacao')->nullable()->useCurrent();  // Equivalente ao campo timestamp com default CURRENT_TIMESTAMP
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('produtos');
    }
}
