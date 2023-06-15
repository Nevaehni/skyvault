<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserFileInvite extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_user_id',
        'invited_user_id',
        'file_id',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_user_id');
    }

    public function invitedUser()
    {
        return $this->belongsTo(User::class, 'invited_user_id');
    }

    public function file()
    {
        return $this->belongsTo(File::class, 'file_id');
    }
}
