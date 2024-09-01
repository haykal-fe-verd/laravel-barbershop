<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barberman extends Model
{
    use HasFactory;

    protected $table = 'tb_barberman';
    protected $keyType = 'integer';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        "name",
        "status",
        "photo"
    ];
}
