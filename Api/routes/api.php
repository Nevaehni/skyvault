<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ShareController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    //Media routes
    Route::get('/media/deleted', [MediaController::class, 'getDeletedMedia']);
    Route::get('/media/{folderId?}', [MediaController::class, 'index']);
    Route::get('/media/thumbnail/{mediaId}', [MediaController::class, 'getThumbnail']);
    Route::get('/media/image/{mediaId}', [MediaController::class, 'getImage']);

    //File routes
    Route::get('/files/download/{id}', [FileController::class, 'show']);
    Route::delete('/files/{id}', [FileController::class, 'softDelete']);
    Route::get('/files/deleted', [FileController::class, 'indexDeletedFiles']);
    Route::patch('/files/restore/{id}', [FileController::class, 'restore']);
    Route::delete('/files/force-delete/{id}', [FileController::class, 'forceDelete']);
    Route::get('/files/{folderId?}', [FileController::class, 'index']);
    Route::post('/upload/{folderId?}', [FileController::class, 'store']);
    Route::patch('/files/{id}', [FileController::class, 'update']);

    //Folder routes
    Route::get('/folders/all', [FolderController::class, 'allIndex']);
    Route::get('/folders/deleted', [FolderController::class, 'getDeletedFolders']);
    Route::get('/folders/{folderId}/download', [FolderController::class, 'downloadFolder']);
    Route::get('/folders/{folderId?}', [FolderController::class, 'index']);

    Route::post('/folders', [FolderController::class, 'store']);
    Route::delete('/folders/{id}', [FolderController::class, 'destroy']);
    Route::patch('/folders/{id}', [FolderController::class, 'update']);
    Route::patch('/folders/restore/{id}', [FolderController::class, 'restore']);

    //Share routes
    Route::get('/shared', [ShareController::class, 'getSharedIndex']);
    Route::get('/share/{id}/access', [ShareController::class, 'index']);
    Route::delete('/share/{id}/access/remove', [ShareController::class, 'destroy']);
    Route::post('/share/{id}', [ShareController::class, 'store']);

    //Search routes
    Route::get('/search/{searchTerm}', [SearchController::class, 'index']);
});

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::patch('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);
