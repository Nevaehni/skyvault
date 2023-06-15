<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\File;
use App\Models\User;
use App\Models\UserFileInvite;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ShareControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function testIndexReturnsInvitedUsers()
    {
        $user = User::factory()->create();
        // Create a file and some user file invites
        $file = File::factory()->create();
        $invites = UserFileInvite::factory()->count(3)->create(['file_id' => $file->id]);

        // Make a request to the controller
        $response = $this->actingAs($user)->get("api/share/{$file->id}/access");

        // Assert that the response is successful
        $response->assertOk();

        // Assert that the response contains the expected data
        foreach ($invites as $invite) {
            $response->assertSee($invite->invitedUser->email);
        }
    }

    public function testGetSharedIndexReturnsSharedFiles()
    {
        // Create some users and files
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $file1 = File::factory()->create(['user_id' => $user1->id]);
        $file2 = File::factory()->create(['user_id' => $user2->id]);

        // Create some user file invites
        UserFileInvite::factory()->create(['owner_user_id' => $user1->id, 'file_id' => $file1->id, 'invited_user_id' => $user2->id]);
        UserFileInvite::factory()->create(['owner_user_id' => $user2->id, 'file_id' => $file2->id, 'invited_user_id' => $user1->id]);

        // Make a request to the controller as user2
        $response = $this->actingAs($user2)->get('api/shared');

        // Assert that the response is successful
        $response->assertOk();

        // Assert that the response contains the expected data
        $response->assertSee($file1->name);
        $response->assertDontSee($file2->name);
    }

    public function testStoreCreatesUserFileInvite()
    {
        // Create a file and a user
        $file = File::factory()->create();
        $user = User::factory()->create();

        // Make a request to the controller
        $response = $this->actingAs($file->user)->post("api/share/{$file->id}", ['email' => $user->email]);

        // Assert that the response is successful
        $response->assertOk();

        // Assert that the user file invite was created
        $this->assertDatabaseHas('user_file_invites', [
            'owner_user_id' => $file->user_id,
            'invited_user_id' => $user->id,
            'file_id' => $file->id
        ]);
    }

    public function testDestroyDeletesUserFileInvite()
    {
        // Create a user file invite
        $invite = UserFileInvite::factory()->create();

        // Make a request to the controller to delete the invite
        $response = $this->actingAs($invite->owner)->delete("api/share/{$invite->id}/access/remove");

        // Assert that the response is successful
        $response->assertOk();

        // Assert that the user file invite was deleted from the database
        $this->assertDatabaseMissing('user_file_invites', [
            'id' => $invite->id,
        ]);
    }

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate');
    }
}
