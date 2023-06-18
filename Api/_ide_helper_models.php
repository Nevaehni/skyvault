<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * App\Models\File
 *
 * @property int $id
 * @property int $user_id
 * @property int|null $folder_id
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Folder|null $folder
 * @property-read \Spatie\MediaLibrary\MediaCollections\Models\Collections\MediaCollection<int, \Spatie\MediaLibrary\MediaCollections\Models\Media> $media
 * @property-read int|null $media_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\UserFileInvite> $sharedWith
 * @property-read int|null $shared_with_count
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\FileFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|File newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|File newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|File onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|File query()
 * @method static \Illuminate\Database\Eloquent\Builder|File whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|File whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|File whereFolderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|File whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|File whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|File whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|File withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|File withoutTrashed()
 */
	class File extends \Eloquent implements \Spatie\MediaLibrary\HasMedia {}
}

namespace App\Models{
/**
 * App\Models\Folder
 *
 * @property int $id
 * @property string $name
 * @property int|null $parent_id
 * @property int|null $user_id
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\File> $files
 * @property-read int|null $files_count
 * @property-read Folder|null $parent_folder
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Folder> $subfolders
 * @property-read int|null $subfolders_count
 * @property-read \App\Models\User|null $user
 * @method static \Database\Factories\FolderFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Folder newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Folder newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Folder onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Folder query()
 * @method static \Illuminate\Database\Eloquent\Builder|Folder whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Folder whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Folder whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Folder whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Folder whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Folder whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Folder whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Folder withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Folder withoutTrashed()
 */
	class Folder extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property int $is_admin
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\File> $files
 * @property-read int|null $files_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Folder> $folders
 * @property-read int|null $folders_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\UserFileInvite> $invitedToFiles
 * @property-read int|null $invited_to_files_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\UserFileInvite> $owns
 * @property-read int|null $owns_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereIsAdmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\UserFileInvite
 *
 * @property int $id
 * @property int $owner_user_id
 * @property int $invited_user_id
 * @property int $file_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\File $file
 * @property-read \App\Models\User $invitedUser
 * @property-read \App\Models\User $owner
 * @method static \Database\Factories\UserFileInviteFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|UserFileInvite newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserFileInvite newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserFileInvite query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserFileInvite whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserFileInvite whereFileId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserFileInvite whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserFileInvite whereInvitedUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserFileInvite whereOwnerUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserFileInvite whereUpdatedAt($value)
 */
	class UserFileInvite extends \Eloquent {}
}

