<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_file_invites', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('owner_user_id');
            $table->unsignedBigInteger('invited_user_id');
            $table->unsignedBigInteger('file_id');
            $table->foreign('owner_user_id')->references('id')->on('users');
            $table->foreign('invited_user_id')->references('id')->on('users');
            $table->foreign('file_id')->references('id')->on('files');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_invites');
    }
};
