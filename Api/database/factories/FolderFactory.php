<?php

namespace Database\Factories;

use App\Models\Folder;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class FolderFactory extends Factory
{
    protected $model = Folder::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'parent_id' => null,
            'user_id' => User::factory(),
        ];
    }

    /**
     * Indicate that the folder should have a parent folder.
     *
     * @return Factory
     */
    public function hasParent()
    {
        return $this->state(function (array $attributes) {
            return [
                'parent_id' => Folder::factory(),
            ];
        });
    }
}
