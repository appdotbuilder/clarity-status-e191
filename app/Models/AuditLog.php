<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\AuditLog
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $timestamp
 * @property string $username
 * @property string $action
 * @property string $details
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|AuditLog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AuditLog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AuditLog query()
 * @method static \Illuminate\Database\Eloquent\Builder|AuditLog whereAction($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AuditLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AuditLog whereDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AuditLog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AuditLog whereTimestamp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AuditLog whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AuditLog whereUsername($value)
 * @method static \Database\Factories\AuditLogFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class AuditLog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'timestamp',
        'username',
        'action',
        'details',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'timestamp' => 'datetime',
    ];

    /**
     * Create a new audit log entry.
     *
     * @param string $username
     * @param string $action
     * @param string $details
     * @return self
     */
    public static function log(string $username, string $action, string $details): self
    {
        return self::create([
            'timestamp' => now(),
            'username' => $username,
            'action' => $action,
            'details' => $details,
        ]);
    }
}