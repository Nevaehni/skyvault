<?php

namespace App\Services;

use App\Models\File;
use Auth;
use Illuminate\Http\Request;

class FileService
{
    public function createMediaFiles(Request $request, $folderId): void
    {
        // Get the authenticated user from the request object
        $user = $request->user();

        // Create a new File model for each uploaded file
        foreach ($request->file('files') as $uploadedFile) {
            // Create a new File model for each uploaded file
            $file = new File();
            $file->user_id = $user->id;
            $file->folder_id = $folderId;
            $file->save();
            
            // Add the media to the newly created File model
            $file->addMedia($uploadedFile)->toMediaCollection(File::TEST_FOLDER_ALIAS);
        }
    }

    public function getFilesByFolderId($folderId)
    {
        return Auth::user()
            ->files
            ->where('folder_id', $folderId)
            ->pluck('media')
            ->flatten();
    }

    public function getFilesInRoot()
    {
        return Auth::user()
            ->files
            ->whereNull('folder_id')
            ->pluck('media')
            ->flatten();
    }

    public function update(Request $request, $id)
    {
        //add file to folder
        $file = File::findOrFail($id);
        $file->folder_id = $request->folder_id;
        $file->save();

        return response()->json(['message' => 'File updated']);
    }

    public function getDeletedFiles()
    {
        return File::onlyTrashed()
            ->where('user_id', Auth::id())
            ->get()
            ->pluck('media')
            ->flatten();
    }
}
