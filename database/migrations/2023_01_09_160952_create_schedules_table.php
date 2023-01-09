<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchedulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('destination_id')->constrained('destinations', 'id')->cascadeOnDelete();

            $table->dateTime('departure_date');
            $table->dateTime('arrival_date');
            $table->integer('price');
            $table->enum('status', ['pending', 'otw', 'arrived', 'cancelled'])->default('pending');

            $table->softDeletes();

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
        Schema::dropIfExists('schedules');
    }
}
