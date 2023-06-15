<?php

namespace Database\Factories;

use App\Models\File;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\UploadedFile;
use Str;

/**
 * @extends Factory<File>
 */
class FileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
        ];
    }

    public function configure(): FileFactory
    {
        return $this->afterCreating(function (File $file) {
            $imageName = 'image_' . Str::random(10) . '.jpg';
            $file->addMedia(UploadedFile::fake()->image($imageName))->toMediaCollection();
        });
    }
}
