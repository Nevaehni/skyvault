<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;

class FoldersResource extends JsonResource
{
    public static $wrap = "";

    /**
     * Transform the resource into an array.
     */
    public function toArray($request): AnonymousResourceCollection|array|JsonSerializable|Arrayable
    {
        return FolderResource::collection($this);
    }
}

