<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropUserTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('user_tickets');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('user_tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->constrained("users", 'id');
            $table->foreignId("ticket_id")->constrained("tickets", 'id');
            $table->enum('status', ['pending', 'waiting', 'paid', 'cancelled']);
            $table->timestamps();
        });
    }
}
