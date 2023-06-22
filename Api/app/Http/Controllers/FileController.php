<?php

namespace App\Http\Controllers;

use App\Http\Resources\FilesResource;
use App\Models\File;
use App\Services\FileService;
use Exception;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class FileController extends Controller
{
    protected FileService $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function index(Request $request, $folderId = null)
    {
        return response(
            new FilesResource(
                $request
                    ->user()
                    ->files()
                    ->where('folder_id', $folderId)
                    ->get()
                    ->pluck('media')
                    ->flatten()
            )
        );
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $folderId = null)
    {
        // Validate that each file in the array is required and is a valid file
        $request->validate([
            'files.*' => 'required',
        ]);

        $user = $request->user();

        // Calculate the total size of the files being uploaded
        $totalSize = array_sum(array_map(function ($file) {
            return $file->getSize();
        }, $request->file('files')));

        // Convert the total size from bytes to megabytes
        $totalSizeInMB = $totalSize / 1024 / 1024;

        // Check if the user has enough storage available
        if ($user->storage_used + $totalSizeInMB > $user->storage_limit) {
            return response()->json(['message' => 'Storage limit exceeded'], 403);
        }

        try {
            $this->fileService->createMediaFiles($request, $folderId);

            // Return a response indicating success
            return response()->json(['message' => 'Files uploaded successfully'], 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred while processing your request'], 500);
        }
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Media $id)
    {
        $media = $id;

        if ($media->model_type !== 'App\Models\File') {
            abort(403, 'Unauthorized action.');
        }

        return response()->download($media->getPath());
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update file data.
     */
    public function update(Request $request, string $id)
    {
        $this->validate($request, [
            'folder_id' => 'nullable|exists:folders,id',
        ]);

        return $this->fileService->update($request, $id);
    }

    /**
     * Display a listing of all soft deleted items.
     */
    public function indexDeletedFiles(Request $request)
    {
        return response(new FilesResource($this->fileService->getDeletedFiles()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function softDelete($id)
    {
        $file = File::findOrFail($id);

        // Delete all the associated shares
        $file->sharedWith()->delete();

        $file->delete();
    }

    /**
     * Restore the specified resource from storage.
     */
    public function restore($id)
    {
        $file = File::onlyTrashed()->findOrFail($id);
        $file->restore();
    }

    /**
     * Permanently delete the specified soft-deleted resource from storage.
     */
    public function forceDelete($id)
    {
        $file = File::onlyTrashed()->findOrFail($id);

        // Check if the file belongs to the authenticated user
        if (auth()->id() !== $file->user_id) {
            abort(403, 'Unauthorized action.');
        }
        $file->media()->delete();

        $file->forceDelete();
    }
}
