<?php

use App\Models\File;
use App\Models\Folder;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Create some sample users
        $user1 = User::create([
            'name' => 'John Doe',
            'email' => 'test@test.com',
            'password' => bcrypt('test@test.com'),
            'is_admin' => '1',
        ]);

        $user2 = User::create([
            'name' => 'John Doe',
            'email' => 'test2@test.com',
            'password' => bcrypt('test2@test.com'),
        ]);

        // Create some sample folders
        $folder1 = Folder::create([
            'name' => 'Folder 1',
            'user_id' => $user1->id,
        ]);

        $folder2 = Folder::create([
            'name' => 'Folder 2',
            'parent_id' => $folder1->id,
            'user_id' => $user1->id,
        ]);

        $folder3 = Folder::create([
            'name' => 'Folder 3',
            'parent_id' => $folder2->id,
            'user_id' => $user1->id,
        ]);

        $folder4 = Folder::create([
            'name' => 'Folder 4',
            'parent_id' => null,
            'user_id' => $user1->id,
        ]);

        $folder5 = Folder::create([
            'name' => 'Folder 5',
            'parent_id' => null,
            'user_id' => $user2->id,
        ]);

        // Create some sample files
        $file1 = File::create([
            'user_id' => $user1->id,
            'folder_id' => $folder1->id
        ]);
        $tempFile1 = tempnam(sys_get_temp_dir(), 'prefix_');
        file_put_contents($tempFile1, 'This is a temporary file.');
        $file1->addMedia($tempFile1)->toMediaCollection();

        $file2 = File::create([
            'user_id' => $user1->id,
            'folder_id' => $folder1->id
        ]);
        $tempFile2 = tempnam(sys_get_temp_dir(), 'prefix_');
        file_put_contents($tempFile2, 'This is a temporary file.');
        $file2->addMedia($tempFile2)->toMediaCollection();

        $file3 = File::create([
            'user_id' => $user1->id,
            'folder_id' => $folder2->id
        ]);
        $tempFile3 = tempnam(sys_get_temp_dir(), 'prefix_');
        file_put_contents($tempFile3, 'This is a temporary file.');
        $file3->addMedia($tempFile3)->toMediaCollection();

        $file4 = File::create([
            'user_id' => $user1->id,
            'folder_id' => $folder3->id
        ]);
        $tempFile4 = tempnam(sys_get_temp_dir(), 'prefix_');
        file_put_contents($tempFile4, 'This is a temporary file.');
        $file4->addMedia($tempFile4)->toMediaCollection();

        $file5 = File::create([
            'user_id' => $user1->id,
            'folder_id' => $folder4->id
        ]);
        $tempFile5 = tempnam(sys_get_temp_dir(), 'prefix_');
        file_put_contents($tempFile5, 'This is a temporary file.');
        $file5->addMedia($tempFile5)->toMediaCollection();

        $file6 = File::create([
            'user_id' => $user1->id,
            'folder_id' => null
        ]);
        $tempFile6 = tempnam(sys_get_temp_dir(), 'prefix_');
        file_put_contents($tempFile6, 'This is a temporary file.');
        $file6->addMedia($tempFile6)->toMediaCollection();


        $file7 = File::create([
            'user_id' => $user2->id,
            'folder_id' => null
        ]);
        $tempFile7 = tempnam(sys_get_temp_dir(), 'prefix_');
        file_put_contents($tempFile7, 'This is a temporary file.');
        $file7->addMedia($tempFile7)->toMediaCollection();


        $file8 = File::create([
            'user_id' => $user2->id,
            'folder_id' => $folder5->id
        ]);
        $tempFile8 = tempnam(sys_get_temp_dir(), 'prefix_');
        file_put_contents($tempFile8, 'This is a temporary file.');
        $file8->addMedia($tempFile8)->toMediaCollection();

    }
}
