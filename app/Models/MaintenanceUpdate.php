<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\MaintenanceUpdate
 *
 * @property int $id
 * @property string $message
 * @property \Illuminate\Support\Carbon $timestamp
 * @property int $maintenance_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\MaintenanceWindow $maintenance
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceUpdate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceUpdate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceUpdate query()
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceUpdate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceUpdate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceUpdate whereMaintenanceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceUpdate whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceUpdate whereTimestamp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceUpdate whereUpdatedAt($value)
 * @method static \Database\Factories\MaintenanceUpdateFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class MaintenanceUpdate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'message',
        'timestamp',
        'maintenance_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'timestamp' => 'datetime',
        'maintenance_id' => 'integer',
    ];

    /**
     * Get the maintenance window that owns this update.
     */
    public function maintenance(): BelongsTo
    {
        return $this->belongsTo(MaintenanceWindow::class);
    }
}