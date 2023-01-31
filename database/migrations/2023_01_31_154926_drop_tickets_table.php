<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('tickets');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            // reference to destination model (from)
            $table->foreignId('from_destination_id')->nullable()->constrained("destinations", "id")->nullOnDelete();
            // reference to destination model (to)
            $table->foreignId('to_destination_id')->nullable()->constrained("destinations", "id")->nullOnDelete();
            // reference to shuttle model and cascade null 
            $table->foreignId('shuttle_id')->nullable()->constrained("shuttles", "id")->nullOnDelete();
            // price
            $table->integer("price");
            // depart date
            $table->dateTime("depart_date");
            // arrival date
            $table->dateTime("arrival_date");
            $table->timestamps();
            $table->softDeletes();
        });
    }
}
