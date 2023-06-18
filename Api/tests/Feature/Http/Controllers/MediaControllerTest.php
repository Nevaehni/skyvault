<?php

namespace Tests\Feature;

use App\Models\File;
use App\Models\Folder;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MediaControllerTest extends TestCase
{
    use RefreshDatabase;

    // Subsection: Testing the index function
    public function testIndex()
    {
        $user = User::factory()->create();
        $folder = Folder::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get("/api/media/{$folder->id}");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'subfolders',
            'files'
        ]);
    }

    // Subsection: Testing the getThumbnail function
    public function testGetThumbnail()
    {
        $user = User::factory()->create();
        $file = File::factory()->create(['user_id' => $user->id]);

        $media = $file->getMedia()[0];

        $response = $this->actingAs($user)->get("/api/media/thumbnail/{$media->id}");

        $response->assertStatus(200);
        $this->assertEquals('image/jpeg', $response->headers->get('content-type'));
    }

    public function testGetThumbnailNotFound()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get("/api/media/thumbnail/9999");

        $response->assertStatus(404);
    }

    // Subsection: Testing the getImage function
    public function testGetImage()
    {
        $user = User::factory()->create();
        $file = File::factory()->create(['user_id' => $user->id]);

        $media = $file->getMedia()[0];

        $response = $this->actingAs($user)->get("/api/media/image/{$media->id}");

        $response->assertStatus(200);
        $this->assertEquals('image/jpeg', $response->headers->get('content-type'));
    }

    public function testGetImageNotFound()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get("/api/media/image/9999");

        $response->assertStatus(404);
    }

    // Subsection: Testing the getDeletedMedia function
    public function testGetDeletedMedia()
    {
        $user = User::factory()->create();
        $file = File::factory()->create(['user_id' => $user->id]);

        $file->delete();

        $response = $this->actingAs($user)->get("/api/media/deleted");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'subfolders',
            'files'
        ]);
    }
}
