<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneOrMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Folder extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'parent_id',
    ];

    public static function boot()
    {
        parent::boot();

        // Delete related files and subfolders when deleting a folder
        static::deleting(function ($folder) {

            if ($folder->isForceDeleting()) {
                // If force deleting, also delete related files and subfolders permanently
                $folder->files()->forceDelete();
                $folder->subfolders()->withTrashed()->each(function ($subfolder) {
                    $subfolder->forceDelete();
                });
            } else {
                // Otherwise, soft delete related files and subfolders
                $folder->files()->delete();
                $folder->subfolders()->each(function ($subfolder) {
                    $subfolder->delete();
                });
            }
        });

        // Restore related files and subfolders when restoring a folder
        static::restoring(function ($folder) {
            $folder->files()->withTrashed()->restore();
            $folder->subfolders()->withTrashed()->each(function ($subfolder) {
                $subfolder->restore();
            });
        });
    }

    // Get all files related to this folder
    public function files(): HasOneOrMany
    {
        return $this->hasMany(File::class);
    }

    // Get all subfolders related to this folder
    public function subfolders(): HasOneOrMany
    {
        return $this->hasMany(Folder::class, 'parent_id');
    }

    // Get the parent folder of this folder
    public function parent_folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class, 'parent_id');
    }

    // Get the user who owns this folder
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
