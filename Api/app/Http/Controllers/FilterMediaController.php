<?php

namespace App\Http\Controllers;

use App\Http\Resources\FilesResource;
use App\Services\FilterService;
use Illuminate\Http\Request;

class FilterMediaController extends Controller
{

    public function __construct(FilterService $filterService)
    {
        $this->filterService = $filterService;
    }

    public function getFilteredData(Request $request){

        $request->validate([
            'size' => 'required_without_all:type,created_at|integer',
            'folder_id' => 'nullable|required_if:folder_id,null|integer|min:1',
            'type' => 'required_without_all:size,created_at|string',
            'created_at' => 'required_without_all:type,size|date',
        ]);

        $files = $this->filterService->getFilteredData($request);

        return response(
            new FilesResource($files->pluck('media')->flatten())
        );
    }
}

