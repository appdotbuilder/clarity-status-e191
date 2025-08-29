<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateComponentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->hasPermission('manage_components');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'status' => 'required|in:operational,degraded_performance,partial_outage,major_outage,under_maintenance',
            'display_order' => 'required|integer|min:0',
            'group_id' => 'required|exists:component_groups,id',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Component name is required.',
            'status.required' => 'Component status is required.',
            'status.in' => 'Invalid status selected.',
            'group_id.required' => 'Component group is required.',
            'group_id.exists' => 'Selected group does not exist.',
        ];
    }
}