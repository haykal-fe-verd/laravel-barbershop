<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_transaction', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_user');
            $table->unsignedBigInteger('id_product');
            $table->unsignedBigInteger('id_barberman');
            $table->string('invoice')->unique();
            $table->string('snap_token')->nullable();
            $table->string('snap_url')->nullable();
            $table->string('via')->nullable();
            $table->integer('total')->nullable();
            $table->string('no_antrian')->nullable();
            $table->boolean('is_active_antrian')->default(false);
            $table->string('status')->default('pending');
            $table->string('status_pangkas')->default('pending');

            $table->foreign('id_user')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('id_product')->references('id')->on('tb_product')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('id_barberman')->references('id')->on('tb_barberman')->onUpdate('cascade')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_transaction');
    }
};
