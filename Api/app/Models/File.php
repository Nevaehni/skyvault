<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class File extends Model implements HasMedia
{
    use InteractsWithMedia, HasFactory, SoftDeletes;

    const TEST_FOLDER_ALIAS = "test_files";

    public static function last()
    {
        return static::all()->last();
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('thumb')
            ->nonQueued()
            ->width(100)
            ->optimize()
            ->height(80)
            ->pdfPageNumber(1);

        $this
            ->addMediaConversion('quality')
            ->nonQueued()
            ->optimize()
            ->pdfPageNumber(1);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function sharedWith(): HasMany
    {
        return $this->hasMany(UserFileInvite::class, 'file_id');
    }

    public function folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class);
    }
}
