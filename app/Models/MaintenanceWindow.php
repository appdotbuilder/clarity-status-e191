<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\MaintenanceWindow
 *
 * @property int $id
 * @property string $title
 * @property string $description
 * @property \Illuminate\Support\Carbon $start_time
 * @property \Illuminate\Support\Carbon $end_time
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Component> $affectedComponents
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\MaintenanceUpdate> $updates
 * @property-read bool $is_active
 * @property-read bool $is_upcoming
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceWindow newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceWindow newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceWindow query()
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceWindow active()
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceWindow upcoming()
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceWindow whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceWindow whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceWindow whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceWindow whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceWindow whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceWindow whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MaintenanceWindow whereUpdatedAt($value)
 * @method static \Database\Factories\MaintenanceWindowFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class MaintenanceWindow extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'start_time',
        'end_time',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    /**
     * Get the components affected by this maintenance.
     */
    public function affectedComponents(): BelongsToMany
    {
        return $this->belongsToMany(Component::class, 'maintenance_affected_components');
    }

    /**
     * Get the updates for this maintenance window.
     */
    public function updates(): HasMany
    {
        return $this->hasMany(MaintenanceUpdate::class, 'maintenance_id')->orderBy('timestamp', 'desc');
    }

    /**
     * Scope a query to only include active maintenance windows.
     */
    public function scopeActive($query)
    {
        $now = now();
        return $query->where('start_time', '<=', $now)->where('end_time', '>=', $now);
    }

    /**
     * Scope a query to only include upcoming maintenance windows.
     */
    public function scopeUpcoming($query)
    {
        return $query->where('start_time', '>', now());
    }

    /**
     * Check if the maintenance window is currently active.
     */
    public function getIsActiveAttribute(): bool
    {
        $now = now();
        return $this->start_time <= $now && $this->end_time >= $now;
    }

    /**
     * Check if the maintenance window is upcoming.
     */
    public function getIsUpcomingAttribute(): bool
    {
        return $this->start_time > now();
    }
}