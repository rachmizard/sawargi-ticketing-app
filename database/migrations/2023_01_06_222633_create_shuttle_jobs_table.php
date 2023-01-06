<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShuttleJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shuttle_jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shuttle_id')->constrained("shuttles", "id")->cascadeOnDelete();
            $table->foreignId('ticket_id')->constrained("tickets", "id")->cascadeOnDelete();
            $table->enum('status', ['pending', 'otw', 'done'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shuttle_jobs');
    }
}
