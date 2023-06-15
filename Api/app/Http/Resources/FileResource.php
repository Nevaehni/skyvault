<?php

namespace App\Http\Resources;

use App\Models\UserFileInvite;
use Illuminate\Http\Resources\Json\JsonResource;

class FileResource extends JsonResource
{
    public static $wrap = "";

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        $size = round($this->size / 1048576, 2);
        $size = $size >= 1 ? number_format($size, 2) . ' MB' : round($this->size / 1024, 2) . ' KB';

        return [
            'id' => $this->id,
            'name' => $this->name,
            'file_name' => $this->file_name,
            'url_thumb' => ($this->hasGeneratedConversion('thumb') ? $this->getUrl('thumb') : null),
            'url' => $this->getUrl(),
            'size' => $size,
            'mime_type' => $this->mime_type,
            'extension' => $this->extension,
            'updated_at' => date("Y-m-d H:i:s", strtotime($this->updated_at)),
            'created_at' => date("Y-m-d H:i:s", strtotime($this->created_at)),
            'user_id' => (!$this->model ? null : $this->model->user_id),
            'user_email' => (!$this->model ? null : $this->model->user->email),
            'shared' => ($this->model && UserFileInvite::where('file_id', $this->model->id)->get()->count() > 0),
        ];
    }
}

