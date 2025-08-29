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
        Schema::create('incident_updates', function (Blueprint $table) {
            $table->id();
            $table->text('message');
            $table->enum('status', [
                'investigating',
                'identified',
                'monitoring',
                'resolved'
            ]);
            $table->timestamp('timestamp');
            $table->foreignId('incident_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            
            $table->index(['incident_id', 'timestamp']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incident_updates');
    }
};