<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FolderResource extends JsonResource
{
    public static $wrap = "";

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'user_id' => $this->user_id,
            'updated_at' => date("Y-m-d H:i:s", strtotime($this->updated_at)),
            'created_at' => date("Y-m-d H:i:s", strtotime($this->created_at)),
            'parent_folder_id' => $this->parent_id,
            'parent_folder_name' => $this->parent_folder ? $this->parent_folder->name : null,
        ];
    }
}

