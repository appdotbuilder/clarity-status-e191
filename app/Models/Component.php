<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\Component
 *
 * @property int $id
 * @property string $name
 * @property string $status
 * @property int $display_order
 * @property int $group_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ComponentGroup $group
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Incident> $incidents
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\MaintenanceWindow> $maintenances
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Automation> $automations
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Component newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Component newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Component query()
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereDisplayOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereGroupId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Component whereUpdatedAt($value)
 * @method static \Database\Factories\ComponentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Component extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'status',
        'display_order',
        'group_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'display_order' => 'integer',
        'group_id' => 'integer',
    ];

    /**
     * Get the group that owns this component.
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(ComponentGroup::class);
    }

    /**
     * Get the incidents that affect this component.
     */
    public function incidents(): BelongsToMany
    {
        return $this->belongsToMany(Incident::class, 'incident_affected_components');
    }

    /**
     * Get the maintenance windows that affect this component.
     */
    public function maintenances(): BelongsToMany
    {
        return $this->belongsToMany(MaintenanceWindow::class, 'maintenance_affected_components');
    }

    /**
     * Get the automations that target this component.
     */
    public function automations(): BelongsToMany
    {
        return $this->belongsToMany(Automation::class, 'automation_components');
    }
}