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
        Schema::create('maintenance_updates', function (Blueprint $table) {
            $table->id();
            $table->text('message');
            $table->timestamp('timestamp');
            $table->foreignId('maintenance_id')->constrained('maintenance_windows')->onDelete('cascade');
            $table->timestamps();
            
            $table->index(['maintenance_id', 'timestamp']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenance_updates');
    }
};