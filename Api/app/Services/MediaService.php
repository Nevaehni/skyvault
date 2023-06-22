<?php

namespace App\Services;

use App\Http\Resources\FilesResource;
use App\Http\Resources\FolderResource;
use App\Http\Resources\FoldersResource;
use App\Models\Folder;
use Illuminate\Http\Request;

class MediaService
{
    protected FolderService $folderService;
    protected FileService $fileService;

    public function __construct(FolderService $folderService, FileService $fileService)
    {
        $this->folderService = $folderService;
        $this->fileService = $fileService;
    }

    public function index(Request $request, $folderId = null)
    {
        $user = $request->user();
        $response = [];

        if ($folderId && Folder::find($folderId)) {
            $folder = $user->folders->find($folderId);
            $folders = $this->folderService->getSubfolders($folder);
            $media = $this->fileService->getFilesByFolderId($folderId);
            $response['parent_folder'] = new FolderResource($folder);
        } else {
            $media = $this->fileService->getFilesInRoot();
            $folders = $this->folderService->getRootFoldersByUserId($user->id);
        }

        $response['subfolders'] = new FoldersResource($folders);
        $response['files'] = new FilesResource($media);

        return response()->json($response);
    }

    public function getDeletedMedia()
    {
        $folders = $this->folderService->getDeletedFolders();
        $files = $this->fileService->getDeletedFiles();
        $response['subfolders'] = new FoldersResource($folders);
        $response['files'] = new FilesResource($files);

        return response()->json($response);
    }
}
