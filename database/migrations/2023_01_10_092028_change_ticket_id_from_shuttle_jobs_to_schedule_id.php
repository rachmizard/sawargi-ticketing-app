<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeTicketIdFromShuttleJobsToScheduleId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('shuttle_jobs', function (Blueprint $table) {
            $table->dropForeign(['ticket_id']);
            $table->dropColumn(['ticket_id']);

            $table->foreignId('schedule_id')->after('shuttle_id')->after('id')->constrained('schedules', 'id')->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('shuttle_jobs', function (Blueprint $table) {

            $table->dropForeign(['schedule_id']);
            $table->dropColumn(['schedule_id']);

            $table->foreignId('ticket_id')->after('id')->constrained('tickets', 'id')->cascadeOnUpdate();
        });
    }
}
