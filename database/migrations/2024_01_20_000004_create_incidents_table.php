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
        Schema::create('incidents', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->timestamp('resolved_at')->nullable();
            $table->enum('status', [
                'investigating',
                'identified',
                'monitoring',
                'resolved'
            ])->default('investigating');
            $table->enum('impact', [
                'none',
                'minor',
                'major',
                'critical'
            ])->default('minor');
            $table->text('impact_description')->nullable();
            $table->text('root_cause')->nullable();
            $table->timestamps();
            
            $table->index(['status', 'created_at']);
            $table->index('resolved_at');
            $table->index('impact');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidents');
    }
};