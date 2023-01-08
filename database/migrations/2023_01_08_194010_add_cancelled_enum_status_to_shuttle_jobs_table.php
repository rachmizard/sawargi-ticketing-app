<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddCancelledEnumStatusToShuttleJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('shuttle_jobs', function (Blueprint $table) {
            DB::statement("ALTER TABLE `shuttle_jobs` CHANGE `status` `status` ENUM('pending', 'otw', 'done', 'cancelled');");
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
            DB::statement("ALTER TABLE `shuttle_jobs` CHANGE `status` `status` ENUM('pending', 'otw', 'done');");
        });
    }
}
