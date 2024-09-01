<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'tb_transaction';
    protected $keyType = 'integer';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        "id_user",
        "id_product",
        "id_barberman",
        "invoice",
        "snap_token",
        "snap_url",
        "via",
        "total",
        "no_antrian",
        "is_active_antrian",
        "status",
        "status_pangkas",
    ];

    // relationship
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'id_product', 'id');
    }

    public function barberman(): BelongsTo
    {
        return $this->belongsTo(Barberman::class, 'id_barberman', 'id');
    }
}
