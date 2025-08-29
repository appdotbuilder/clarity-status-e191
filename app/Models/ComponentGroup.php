<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ComponentGroup
 *
 * @property int $id
 * @property string $name
 * @property int $display_order
 * @property bool $collapsed_by_default
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Component> $components
 * @property-read string $status
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ComponentGroup newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ComponentGroup newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ComponentGroup query()
 * @method static \Illuminate\Database\Eloquent\Builder|ComponentGroup whereCollapsedByDefault($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ComponentGroup whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ComponentGroup whereDisplayOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ComponentGroup whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ComponentGroup whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ComponentGroup whereUpdatedAt($value)
 * @method static \Database\Factories\ComponentGroupFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ComponentGroup extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'display_order',
        'collapsed_by_default',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'collapsed_by_default' => 'boolean',
        'display_order' => 'integer',
    ];

    /**
     * Get the components that belong to this group.
     */
    public function components(): HasMany
    {
        return $this->hasMany(Component::class, 'group_id')->orderBy('display_order');
    }

    /**
     * Get the overall status of this group based on its components.
     */
    public function getStatusAttribute(): string
    {
        $statuses = $this->components->pluck('status')->toArray();
        
        if (in_array('major_outage', $statuses)) {
            return 'major_outage';
        }
        if (in_array('partial_outage', $statuses)) {
            return 'partial_outage';
        }
        if (in_array('degraded_performance', $statuses)) {
            return 'degraded_performance';
        }
        if (in_array('under_maintenance', $statuses)) {
            return 'under_maintenance';
        }
        
        return 'operational';
    }
}