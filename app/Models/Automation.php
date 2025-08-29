<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\Automation
 *
 * @property int $id
 * @property string $name
 * @property string $target_status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Component> $components
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Automation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Automation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Automation query()
 * @method static \Illuminate\Database\Eloquent\Builder|Automation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Automation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Automation whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Automation whereTargetStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Automation whereUpdatedAt($value)
 * @method static \Database\Factories\AutomationFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Automation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'target_status',
    ];

    /**
     * Get the components that this automation targets.
     */
    public function components(): BelongsToMany
    {
        return $this->belongsToMany(Component::class, 'automation_components');
    }

    /**
     * Execute this automation by updating all target components to the target status.
     *
     * @return int Number of components updated
     */
    public function execute(): int
    {
        return $this->components()->update(['status' => $this->target_status]);
    }
}