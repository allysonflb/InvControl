<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductManagerController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/produtos', [ProductManagerController::class, 'produtosList']);