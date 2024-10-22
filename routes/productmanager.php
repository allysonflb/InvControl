<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductManagerController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/produtos', [ProductManagerController::class, 'produtosList']);
Route::post('/produtosCreate', [ProductManagerController::class, 'produtosCreate']);
Route::put('/produtosUpdate/{id}', [ProductManagerController::class, 'produtosUpdate']);
Route::delete('/produtosDelete/{id}', [ProductManagerController::class, 'produtosDelete']);