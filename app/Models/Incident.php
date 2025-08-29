<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Incident
 *
 * @property int $id
 * @property string $title
 * @property \Illuminate\Support\Carbon|null $resolved_at
 * @property string $status
 * @property string $impact
 * @property string|null $impact_description
 * @property string|null $root_cause
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Component> $affectedComponents
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\IncidentUpdate> $updates
 * @property-read bool $is_resolved
 * @property-read string $duration
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Incident newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Incident newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Incident query()
 * @method static \Illuminate\Database\Eloquent\Builder|Incident active()
 * @method static \Illuminate\Database\Eloquent\Builder|Incident resolved()
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereImpact($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereImpactDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereResolvedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereRootCause($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Incident whereUpdatedAt($value)
 * @method static \Database\Factories\IncidentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Incident extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'resolved_at',
        'status',
        'impact',
        'impact_description',
        'root_cause',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'resolved_at' => 'datetime',
    ];

    /**
     * Get the components affected by this incident.
     */
    public function affectedComponents(): BelongsToMany
    {
        return $this->belongsToMany(Component::class, 'incident_affected_components');
    }

    /**
     * Get the updates for this incident.
     */
    public function updates(): HasMany
    {
        return $this->hasMany(IncidentUpdate::class)->orderBy('timestamp', 'desc');
    }

    /**
     * Scope a query to only include active incidents.
     */
    public function scopeActive($query)
    {
        return $query->whereNull('resolved_at');
    }

    /**
     * Scope a query to only include resolved incidents.
     */
    public function scopeResolved($query)
    {
        return $query->whereNotNull('resolved_at');
    }

    /**
     * Check if the incident is resolved.
     */
    public function getIsResolvedAttribute(): bool
    {
        return $this->resolved_at !== null;
    }

    /**
     * Get the duration of the incident.
     */
    public function getDurationAttribute(): string
    {
        $end = $this->resolved_at ?? now();
        $duration = $this->created_at->diff($end);
        
        $parts = [];
        if ($duration->d > 0) {
            $parts[] = $duration->d . ' day' . ($duration->d > 1 ? 's' : '');
        }
        if ($duration->h > 0) {
            $parts[] = $duration->h . ' hour' . ($duration->h > 1 ? 's' : '');
        }
        if ($duration->i > 0) {
            $parts[] = $duration->i . ' minute' . ($duration->i > 1 ? 's' : '');
        }
        
        return implode(' ', $parts) ?: '0 minutes';
    }
}