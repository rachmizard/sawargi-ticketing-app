<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->constrained("users", 'id')->onDelete("cascade");
            $table->foreignId("ticket_id")->constrained("tickets", 'id')->onDelete("cascade");
            $table->foreignId("invoice_id")->nullable()->constrained("invoices", "id")->nullOnDelete();
            $table->enum('status', ['pending', 'waiting', 'paid', 'cancelled']);
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
        Schema::dropIfExists('user_tickets');
    }
}
