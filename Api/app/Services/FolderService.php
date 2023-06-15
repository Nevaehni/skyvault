<?php

namespace App\Services;

use App\Http\Resources\FoldersResource;
use App\Models\Folder;
use Auth;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\Support\MediaStream;

class FolderService
{
    public function index(Request $request, $folderId = null)
    {
        $folders = $request->user()->folders->where('parent_id', $folderId);
        return response(new FoldersResource($folders));
    }

    public function allIndex(Request $request)
    {
        $folders = $request->user()->folders;
        return response(new FoldersResource($folders));
    }

    // get all subfolders of a given folder
    public function getSubfolders(Folder $folder)
    {
        return new FoldersResource($folder->subfolders);
    }

    // get all root folders for a given user
    public function getRootFoldersByUserId($userId)
    {
        return new FoldersResource(Folder::where('user_id', $userId)->whereNull('parent_id')->get());
    }

    public function store(Request $request)
    {
        $folder = new Folder();
        $folder->name = $request->name;
        $folder->user_id = $request->user()->id;
        $folder->parent_id = $request->parent_id;
        $folder->save();

        return response()->json(['message' => 'Folder created']);
    }

    public function destroy(Folder $folder)
    {
        if ($folder->trashed()) {
            $folder->forceDelete();
        } else {
            $folder->delete();
        }
        return response()->json(['message' => 'Folder deleted']);
    }

    public function getDeletedFolders()
    {
        return Folder::onlyTrashed()
            ->where('user_id', Auth::id())
            ->get();
    }

    public function restore(Request $request, $id)
    {
        $folder = Folder::onlyTrashed()->where('id', $id)->first();

        if (!$folder) {
            return response()->json(['message' => 'Folder not found']);
        }

        $folder->parent_id = null;

        $folder->restore();
        return response()->json(['message' => 'Folder restored']);
    }

    public function downloadFolder(Request $request, Folder $folder)
    {
        if ($request->user()->id !== $folder->user_id) {
            return response()->json(['message' => 'You are not authorized to access this folder']);
        }

        // Get all files related to this folder and its subfolders
        $files = $folder->files()->get()->merge($folder->subfolders()->with('files')->get()->pluck('files')->flatten());

        // Create a MediaStream for the files
        $media = [];
        foreach ($files as $file) {
            $media[] = $file->media->first();
        }

        return MediaStream::create($folder->name . '.zip')->addMedia($media);
    }

    public function update(Request $request, string $id)
    {
        if ($request->folder_id === $id) {
            return response()->json(['message' => 'Folder cannot be moved to itself']);
        }

        $folder = Folder::where('id', $id)->first();
        $folder->parent_id = $request->folder_id;
        $folder->save();

        return response()->json(['message' => 'Folder moved']);
    }
}
