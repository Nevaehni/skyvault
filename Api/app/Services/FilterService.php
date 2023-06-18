<?php

namespace App\Services;

use App\Services\misc\FilterQueryBuilder;
use App\Models\File;


class FilterService
{
    public function getFilteredData($request){
        $files = new FilterQueryBuilder($request->all(), File::class);
        $files = $files->getFilteredData();

        return $files;
    }
}
