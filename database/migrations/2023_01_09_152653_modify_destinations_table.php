<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ModifyDestinationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('destinations', function (Blueprint $table) {
            try {
                DB::beginTransaction();

                $table->foreignId('from_outlet_id')->after('id')->constrained('outlets', 'id')->cascadeOnDelete();
                $table->foreignId('to_outlet_id')->after('from_outlet_id')->constrained('outlets', 'id')->cascadeOnDelete();
                $table->foreignId("shuttle_id")->after('to_outlet_id')->constrained('shuttles', 'id')->cascadeOnDelete();

                $table->dropColumn('name');
                $table->dropColumn('city_type');

                $table->softDeletes();

                DB::commit();
            } catch (\Throwable $th) {
                DB::rollBack();
                throw $th;
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('destinations', function (Blueprint $table) {
            try {
                DB::beginTransaction();


                $table->dropForeign(['from_outlet_id']);
                $table->dropForeign(['to_outlet_id']);
                $table->dropForeign(['shuttle_id']);

                $table->dropColumn('from_outlet_id');
                $table->dropColumn('to_outlet_id');
                $table->dropColumn('shuttle_id');

                $table->string('name', 255)->after('id');
                $table->enum('city_type', ['Jakarta', 'Bandung'])->after('name');

                $table->dropSoftDeletes();

                DB::commit();
            } catch (\Throwable $th) {
                DB::rollBack();
                throw $th;
            }
        });
    }
}
