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
        Schema::create('components', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('status', [
                'operational',
                'degraded_performance',
                'partial_outage',
                'major_outage',
                'under_maintenance'
            ])->default('operational');
            $table->integer('display_order')->default(0);
            $table->foreignId('group_id')->constrained('component_groups')->onDelete('cascade');
            $table->timestamps();
            
            $table->index(['group_id', 'display_order']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('components');
    }
};