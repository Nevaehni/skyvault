<?php

namespace App\Services;

use App\Http\Resources\FilesResource;
use App\Http\Resources\FoldersResource;
use Auth;
use App\Models\File;


use Illuminate\Database\Eloquent\Builder;

class SearchService
{
    public function search(string $searchTerm)
    {
        $files = $this->searchFiles($searchTerm);
        $folders = $this->searchFolders($searchTerm);

        return [
            'files' => $files,
            'subfolders' => $folders,
        ];
    }

    public function searchFiles(string $searchTerm)
    {
        $user = Auth::user();
        $files = collect();

        if ($user && method_exists($user, 'files')) {
            $files = File::whereHas('media', function (Builder $query) use ($searchTerm) {
                $query->where('name', 'like', '%' . strtolower($searchTerm) . '%');
            })
                ->where('user_id', $user->id)
                ->get()
                ->pluck('media')
                ->flatten();
        }
        return new FilesResource($files);
    }




    public function searchFolders(string $searchTerm)
    {
        $user = Auth::user();
        $folders = collect();

        if ($user && method_exists($user, 'folders')) {
            $folders = $user->folders()
                ->where('name', 'like', '%' . $searchTerm . '%')
                ->get();
        }

        // Return an empty collection or handle the error appropriately
        return new FoldersResource($folders);
    }

}
