<?php

namespace App\Http\Controllers;

use App\Services\MediaService;
use File;
use Illuminate\Http\Request;
use Response;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MediaController extends Controller
{
    protected MediaService $mediaService;

    public function __construct(MediaService $mediaService)
    {
        $this->mediaService = $mediaService;
    }

    public function index(Request $request, $folderId = null)
    {
        return $this->mediaService->index($request, $folderId);
    }

    public function getThumbnail($mediaId)
    {
        $media = Media::findOrFail($mediaId);
        $thumbnail_path = $media->getPath('thumb');

        if (!File::exists($thumbnail_path)) {
            abort(404);
        }

        $file = File::get($thumbnail_path);
        $type = File::mimeType($thumbnail_path);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);

        return $response;
    }

    public function getImage($mediaId)
    {
        $media = Media::findOrFail($mediaId);
        $image_path = $media->getPath('quality');

        if (!File::exists($image_path)) {
            abort(404);
        }

        $file = File::get($image_path);
        $type = File::mimeType($image_path);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);

        return $response;
    }

    public function getDeletedMedia()
    {
        return $this->mediaService->getDeletedMedia();
    }
}
