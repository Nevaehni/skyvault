<?php

namespace App\Services;

use App\Http\Resources\FilesResource;
use App\Models\File;
use App\Models\User;
use App\Models\UserFileInvite;

class ShareService
{
    public function getInvitedUsers($file_id)
    {
        return UserFileInvite::where('file_id', $file_id)
            ->with('invitedUser')
            ->get()
            ->pluck('invitedUser.email', 'id');
    }

    public function getSharedMedia($user_id)
    {
        $sharedFileInvites = UserFileInvite::where('invited_user_id', $user_id)->get();

        $sharedFiles = $sharedFileInvites->map(function ($invite) {
            return $invite->file;
        });

        $response['subfolders'] = []; //Todo: new FoldersResource($folders);
        $response['files'] = new FilesResource($sharedFiles->pluck('media')->flatten());

        return $response;
    }

    public function shareFileWithUser($file_id, $email)
    {
        $user = User::where('email', $email)->firstOrFail();
        $file = File::findOrFail($file_id);

        $invite = new UserFileInvite;
        $invite->owner_user_id = auth()->user()->id;
        $invite->invited_user_id = $user->id;
        $invite->file_id = $file->id;
        $invite->save();
    }

    public function deleteUserFileInvite($id)
    {
        $invite = UserFileInvite::findOrFail($id);
        $invite->delete();
    }
}
