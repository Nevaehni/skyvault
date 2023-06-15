<?php

namespace Database\Factories;

use App\Models\File;
use App\Models\User;
use App\Models\UserFileInvite;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFileInviteFactory extends Factory
{
    protected $model = UserFileInvite::class;

    public function definition()
    {
        return [
            'owner_user_id' => User::factory(),
            'invited_user_id' => User::factory(),
            'file_id' => File::factory()
        ];
    }
}

