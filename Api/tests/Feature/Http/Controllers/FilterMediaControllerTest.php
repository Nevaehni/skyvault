<?php

namespace Tests\Feature\Http\Controllers;

use App\Http\Controllers\FilterMediaController;
use App\Http\Resources\FilesResource;
use App\Models\File;
use App\Models\User;
use App\Services\FilterService;
use App\Services\misc\FilterQueryBuilder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\Request;

class FilterMediaControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    private $user;
    private $filterService;
    private $filterQueryBuilder;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('password'),
        ]);

        // Mock FilterService
        $this->filterService = $this->getMockBuilder(FilterService::class)
            ->disableOriginalConstructor()
            ->getMock();

        // Mock FilterQueryBuilder
        $this->filterQueryBuilder = $this->getMockBuilder(FilterQueryBuilder::class)
            ->disableOriginalConstructor()
            ->getMock();
    }

    public function testGetFilteredData()
    {
        // Mock the behavior of FilterQueryBuilder methods
        $this->filterQueryBuilder->method('getFilteredData')->willReturn(collect([new File()]));

        // Mock the behavior of FilterService getFilteredData to use the mock FilterQueryBuilder
        $this->filterService->method('getFilteredData')->willReturn($this->filterQueryBuilder->getFilteredData());

        // Instantiate FilterMediaController with mocked FilterService
        $controller = new FilterMediaController($this->filterService);

        // Assuming there are required parameters in your request
        $request = new Request([
            'size' => 1,
            'type' => 'image/jpeg',
            'created_at' => now()->toString(),
        ]);

        $response = $controller->getFilteredData($request);

        $this->assertInstanceOf(FilesResource::class, $response->getOriginalContent());
    }
}
