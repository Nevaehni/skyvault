<?php

namespace App\Models;

use Carbon\Carbon;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'storage_limit',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the user's created_at date.
     *
     * @param  string  $value
     * @return string
     */
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d H:i:s');
    }

    /**
     * Get the user's updated_at date.
     *
     * @param  string  $value
     * @return string
     */
    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d H:i:s');
    }

    public static function boot(){
        parent::boot();
        self::deleting(function($user){
            $user->folders()->withTrashed()->each(function ($subfolder) {
                $subfolder->forceDelete();
            });

            $user->files()->withTrashed()->each(function ($file) {
                $file->media()->delete();
                $file->forceDelete();
            });
        });
    }

    public function files(): HasMany
    {
        return $this->hasMany(File::class);
    }

    public function owns(): HasMany
    {
        return $this->hasMany(UserFileInvite::class, 'owner_user_id');
    }

    public function invitedToFiles()
    {
        return $this->belongsToMany(UserFileInvite::class, 'invited_user_id');
    }

    public function folders()
    {
        return $this->hasMany(Folder::class);
    }
}
