<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;


class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        User::factory()->count(4)->create();
        $users = User::factory()->count(1)->create(['is_admin' => 1] );

        $response = $this->actingAs($users->first())->get('/api/users');

        $response->assertStatus(200);
        $responseData = json_decode($response->getContent(), true);
        $this->assertCount(5, $responseData);
    }

    public function testStore()
    {
        $admin = User::factory()->create(['is_admin' => 1]);
        $data = [
            'name' => 'John Doe',
            'email' => 'john@doe.com',
            'password' => 'password123',
        ];

        $response = $this->actingAs($admin)->post('/api/users', $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'john@doe.com',
        ]);
    }

    public function testUpdate()
    {
        $admin = User::factory()->create([
            'is_admin' => 1,
            'password' => Hash::make('password123'),
        ]);

        $data = [
            'password' => 'newpassword123',
        ];

        $response = $this->actingAs($admin)->patch("/api/users/{$admin->id}", $data);

        $response->assertStatus(200);
        $this->assertTrue(Hash::check('newpassword123', $admin->fresh()->password));
    }

    public function testDestroy()
    {
        $admin = User::factory()->create(['is_admin' => 1]);

        $response = $this->actingAs($admin)->delete("/api/users/{$admin->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('users', ['id' => $admin->id]);
    }
}
