<?php

namespace App\Services\misc;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class FilterQueryBuilder
{
    private Builder $queryBuilder;

    public function __construct(array $args, $query)
    {
        $this->args = $args;
        $this->queryBuilder = $query::query();
    }

    private function applyArgsOnQuery(){
        $args = $this->args;

        $this->queryBuilder->where('user_id', Auth::user()->id);

        if (array_key_exists('folder_id', $args)){
            $this->queryBuilder->where('folder_id', $args['folder_id']);
        }
        if (array_key_exists('size', $args)){
            $sizeInBytes = $args['size'] * 1024;
            $this->queryBuilder->whereHas('media', function ($query) use ($sizeInBytes) {
                $query->where('size', '<=', $sizeInBytes);
            });
        }
        if (array_key_exists('type', $args)){
            $this->queryBuilder->whereHas('media', function ($query) use ($args) {
                $query->where('mime_type', 'like', "%{$args['type']}%");
            });
        }
        if (array_key_exists('created_at', $args)){
            $this->queryBuilder->where('created_at', '>=', Carbon::createFromFormat('Y-m-d', $args['created_at'])->startOfDay());
        }
    }

    public function getFilteredData(){
        $this->applyArgsOnQuery();
        return $this->queryBuilder->get();
    }
}
