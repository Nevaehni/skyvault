<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;



class UserController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Store a newly created users.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'storage_limit' => 'integer',
        ]);

        $user = new User($request->all());
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(['message' => 'User created successfully', 'user' => $user]);
    }


    /**
     * Update the specified users.
     */
    public function update(Request $request, User $user)
    {
        // Validate incoming data
        $data = $request->validate([
            'email' => ['sometimes', 'required', 'email', Rule::unique('users')->ignore($user->id)],
            'password' => 'sometimes|nullable|min:6',
            'storage_limit' => 'sometimes|integer|min:0', // Validate that storage_limit is provided, is an integer and not less than 0
        ]);

        // Update user's email and password if they were provided
        if (isset($data['email'])) {
            $user->email = $data['email'];
        }

        // Check if password is not empty
        if (isset($data['password']) && !empty($data['password'])) {
            $user->password = Hash::make($data['password']);
        }

        // Check if storage_limit is set
        if (isset($data['storage_limit'])) {
            $user->storage_limit = $data['storage_limit'];
        }

        $user->save();

        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }





    /**
     * Remove the specified users.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
