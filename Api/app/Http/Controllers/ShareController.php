<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserFileInvite;
use App\Services\ShareService;
use Illuminate\Http\Request;

class ShareController extends Controller
{
    protected $shareService;

    public function __construct(ShareService $shareService)
    {
        $this->shareService = $shareService;
    }

    public function index(Request $request)
    {
        return $this->shareService->getInvitedUsers($request->route('id'));

    }

    public function getSharedIndex(Request $request)
    {
        $user = $request->user();
        return $this->shareService->getSharedMedia($user->id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        if ($request->user()->email == $request->email) {
            return response('You cannot share a file with yourself', 400);
        } else if (User::where('email', $request->email)->get()->count() == 0) {
            return response('User does not exist', 400);
        }

        $file_id = $request->route('id');
        $this->shareService->shareFileWithUser($file_id, $request->email);

        return response('Shared with user successfully');
    }

    public function destroy(UserFileInvite $id)
    {
        $this->shareService->deleteUserFileInvite($id->id);
        return response('File invite deleted successfully');
    }
}
