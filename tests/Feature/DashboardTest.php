<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated users are redirected to admin dashboard', function () {
    $user = User::factory()->create([
        'role_id' => \App\Models\Role::factory()->superAdmin()->create()->id
    ]);
    
    $this->actingAs($user);

    $this->get('/dashboard')->assertRedirect('/admin');
});
