<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use App\Services\FolderService;
use Illuminate\Http\Request;

class FolderController extends Controller
{
    protected FolderService $folderService;

    public function __construct(FolderService $folderService)
    {
        $this->folderService = $folderService;
    }

    public function index(Request $request, $folderId = null)
    {
        return $this->folderService->index($request, $folderId);
    }

    public function allIndex(Request $request)
    {
        return $this->folderService->allIndex($request);
    }

    public function store(Request $request)
    {
        return $this->folderService->store($request);
    }

    public function destroy($id)
    {
        $folder = Folder::withTrashed()->find($id);

        if (!$folder) {
            return response()->json(['message' => 'Folder not found']);
        }

        return $this->folderService->destroy($folder);
    }

    public function getDeletedFolders()
    {
        return $this->folderService->getDeletedFolders();
    }

    public function restore(Request $request, $id)
    {
        return $this->folderService->restore($request, $id);
    }

    public function downloadFolder(Request $request, Folder $folderId)
    {
        return $this->folderService->downloadFolder($request, $folderId);
    }

    public function update(Request $request, string $id)
    {
        $this->validate($request, [
            'folder_id' => 'nullable|exists:folders,id',
        ]);

        return $this->folderService->update($request, $id);
    }
}
