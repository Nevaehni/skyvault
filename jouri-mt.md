## Code Review 1

### Design
We use Tailwind as the framework for styling our webpage.
To create my designs, I first made a low-fidelity
design in Figma for the basic structure and positioning of elements on the page.
Then, I created a high-fidelity prototype with all desired
styling applied.
The low-fidelity design in Figma helped me create a visual
representation of my ideas and concepts, without getting distracted by details such as colors, typography, or other style-related aspects.
By taking this two-step approach, I was able to focus on
creating a solid foundation for my website, before refining the styling in the high-fidelity prototype.
This allowed me to create a well thought-out design that
meets my requirements and meets the needs of my users.

### Methods and Techniques

#### Methods:

1. Choose Tailwind as your front-end framework and become familiar with its features and utilities.
2. Utilize Flexbox and Gridbox to create flexible and responsive layouts.
3. Create separate styling for each component, such as AuthCard.js, Button.js, Input.js, InputError.js, Label.js, AppLayout.js, GuestLayout.js, and Navigation.js.
4. Use modular CSS and class naming conventions to organize your code and make it easier to maintain.
5. Customize the default Tailwind styles to fit your application's brand and visual identity.
6. Use responsive design techniques to ensure your webpage looks good on different screen sizes and devices.
7. Test your webpage on different browsers and devices to ensure compatibility and responsiveness.

#### Techniques:

1. Use Tailwind's utility classes to style your HTML elements and components, such as text colors, background colors, margins, padding, and borders.
2. Utilize Flexbox and Gridbox to create flexible and responsive layouts, such as aligning elements horizontally or vertically, creating a grid-based layout, or adjusting the size and position of elements.
3. Create separate styling for each component, such as defining a class or set of classes for each component, and using Tailwind's utility classes to style each component individually.
4. Use modular CSS and class naming conventions to organize your code and make it easier to maintain, such as creating a separate CSS file for each component, or using BEM (Block-Element-Modifier) naming conventions to name your classes.
5. Customize the default Tailwind styles to fit your application's brand and visual identity, such as modifying the color palette, adjusting the font sizes and typography, or adding custom classes for specific elements or components.
6. Use responsive design techniques such as media queries and flexible layouts to ensure your webpage looks good on different screen sizes and devices, such as adjusting the layout or font size based on the screen width or orientation.
7. Use browser testing tools to test your webpage on different browsers and devices, and make any necessary adjustments to ensure compatibility and responsiveness.

### Research
As I work on this project, I am using Tailwind for the styling of my web pages. However, I am not very familiar with designing, nor am I an expert in using Tailwind. Therefore, I am doing a lot of research and learning as I go along.

I understand that Tailwind is a very powerful and flexible framework that can help me achieve my design goals efficiently. However, as a novice, I need to invest some time and effort into learning the fundamentals of Tailwind before I can make the most of it.

To that end, I have been reading online tutorials, watching video tutorials, and studying the documentation to learn the best practices for using Tailwind in my project. I am also experimenting with different design concepts and techniques to see what works best for my specific use case.

Despite the challenges that come with learning something new, I am excited about the possibilities that Tailwind offers me for creating beautiful and functional designs for my web pages. With practice and perseverance, I am confident that I will become proficient in using Tailwind and designing effective web pages.

### Code snippets

```
const AppLayout = ({ header, children }) => {
const { user } = useAuth({ middleware: 'auth' })

    return (
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 bg-gray-900">
            <Navigation user={user} />

            {/* Index Heading */}
            <header className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-r-2 border-red-500 z-10 sidebar">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>

            {/* Index Content */}
            <main className="h-full ml-14 mt-14 mb-10 md:ml-64">
                {children}
            </main>
        </div>
    )
}
```
In this snippet from the project,
Tailwind is used to style the layout and the navigation
components of a web page. The bg-gray-900 class is applied
to set the background color of the page, while flex and flex-col are used to create a responsive, column-based layout.

The Navigation component is styled using
Tailwind's utility classes, and the header section
is styled with a fixed position, a width of w-14 hover:w-64
md:w-64, and a background color of bg-blue-900 dark:bg-gray-900.

Finally, the main section is styled with
a margin and a responsive width of md:ml-64,
and the children component is inserted into it.
Overall, Tailwind is used to create a visually appealing
and responsive layout for the web page.

```
<GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                }>
                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                <h1 className="text-sky-50 flex justify-center mt-2 mb-5">Log into SkyVault</h1>
                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div>
                        <Input
                            id="email"
                            placeholder="Email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full border-2 text-sky-50"
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                        />

                        <InputError messages={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <Input
                            id="password"
                            placeholder="Password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full border-2 text-sky-50"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                        />

                        <InputError
                            messages={errors.password}
                            className="mt-2"
                        />
                    </div>

                    {/* Remember Me */}
                    <div className="block mt-4 ">
                        <label
                            htmlFor="remember_me"
                            className="inline-flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                name="remember"
                                className="rounded border-gray-300 text-indigo-600 border-1 shadow-neon shadow-blue-500 hover:shadow-neon-hover hover:shadow-blue-500 transition-shadow duration-100"
                                onChange={event =>
                                    setShouldRemember(event.target.checked)
                                }
                            />

                            <span className="ml-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <Link
                            href="/auth/forgot-password"
                            className="underline text-sm text-sky-50 hover:text-sky-200">
                            Forgot your password?
                        </Link>

                        <Link
                            href="/auth/register"
                            className="underline text-sm text-sky-50 hover:text-sky-200">
                            Register
                        </Link>

                        <Button className="ml-3 hover:neon-hover">Login</Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
```

In this snippet, the user interface is being designed for a login page.
The GuestLayout component is being used to structure the layout of the page.
Inside the layout, an AuthCard component is used to contain the login form.
The form contains inputs for email and password, along with a checkbox to
remember the user's login details. There are also links to the forgot
password and registration pages, and a submit button to submit the
login form. Tailwind classes are used extensively to style the various
elements of the login form, including the fonts, colors, spacing, and layout.

```
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-900">

        <div className="w-full sm:max-w-md px-6 py-4 overflow-hidden sm:rounded-lg border-2 border shadow-neon shadow-blue-500">
            <div className="flex justify-center">{logo}</div>
            {children}
        </div>
    </div>
```
This is a functional React component called AuthCard.
It takes two props: logo and children. The logo prop is a
JSX element that represents the logo for the authentication card,
and children are the child components that will be rendered inside the AuthCard.

The AuthCard component creates a container div with a
minimum height of the screen, and it is set up to flex
vertically and horizontally. The background color of this container
is set to bg-gray-900.

Inside this container, another div with a maximum width
of sm:max-w-md is created. It has some padding and overflow
properties set up, and it is set to have rounded edges with a shadow effect.

The logo JSX element is centered inside this container
using flex justify-center. Finally, the children are
rendered inside this same container, underneath the logo.

## Code Review 2

### Methods and Techniques

In this code update, we've build up the FileController class in Laravel with new features for better file management. We added softDelete, restore, forceDelete, and indexDeletedFiles methods, and updated the API endpoints to match.

The softDelete method lets users remove a file without losing it forever. It also deletes all the shares connected to the file. The restore method lets users bring back soft-deleted files. The forceDelete method permanently gets rid of a soft-deleted file, but only if it belongs to the authenticated user. Finally, the indexDeletedFiles method shows a list of all soft-deleted files for the current user.

The code is clean and easy to read, making sure we follow best practices. We've also got proper error handling to deal with any unexpected surprises.

We updated the API endpoints for a smooth integration with the new methods. The MediaResource.php file now checks for validation to keep everything safe and sound.

To sum it up, we've made the FileController class more user-friendly and fun to use, while keeping the code neat and easy to maintain.

For the front-end I added three React functional components: TrashButton, RestoreButton, and ForceDeleteButton. Each of these components represents a button for performing a specific action on a file.

TrashButton handles the soft delete action. When clicked, it calls the onDelete function, which sends an API request to soft-delete the specified file using FileService.deleteFile() and then dispatches a custom event to refresh the file list.

RestoreButton is responsible for restoring a soft-deleted file. When the button is clicked, it triggers the onRestore function that sends an API request using FileService.restoreFile() to restore the specified file. After a successful restore, it also dispatches a custom event to refresh the deleted files list.

ForceDeleteButton permanently deletes a soft-deleted file. When clicked, it calls the onForceDelete function, which sends an API request using FileService.forceDelete() to permanently delete the specified file. After a successful force delete, it dispatches a custom event to refresh the deleted files list.

These components interact with the FileService, which contains the axios-based methods for communicating with the Laravel back-end API.

### Research
I did some research to ensure that the new features would be efficient, maintainable, and in line with best practices. I started by exploring Laravel's built-in features, such as Eloquent ORM, to understand how to effectively perform soft deletes, restore, and force delete operations.

I also looked into the Spatie Media Library package, which is used in the project, to ensure that the new methods would work seamlessly with the existing media management functionality. By studying the package documentation and examples, I gained a better understanding of how to manipulate and retrieve media files using the package's API.

### Code snippets
```
public function indexDeletedFiles(Request $request)
    {
        $user_id = $request->user()->id;

        $deletedFiles = File::onlyTrashed()
            ->where('user_id', $user_id)
            ->get()
            ->pluck('media')
            ->flatten();

        return response(new MediaResource($deletedFiles));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function softDelete($id)
    {
        $file = File::findOrFail($id);

        // Delete all the associated shares
        $file->sharedWith()->delete();

        $file->delete();
    }

    /**
     * Restore the specified resource from storage.
     */
    public function restore($id)
    {
        $file = File::onlyTrashed()->findOrFail($id);
        $file->restore();
    }

    /**
     * Permanently delete the specified soft-deleted resource from storage.
     */
    public function forceDelete($id)
    {
        $file = File::onlyTrashed()->findOrFail($id);

        // Check if the file belongs to the authenticated user
        if (auth()->id() !== $file->user_id) {
            abort(403, 'Unauthorized action.');
        }

        $file->forceDelete();
    }
```

```
    Route::delete('/files/{id}', [FileController::class, 'softDelete']);
    Route::get('/files/deleted', [FileController::class, 'indexDeletedFiles']);
    Route::patch('/files/restore/{id}', [FileController::class, 'restore']);
    Route::delete('/files/force-delete/{id}', [FileController::class, 'forceDelete']);
```

```
const TrashButton = () => {
    const { file } = useContext(FileContext);
    const onDelete = async () => {
        try {
            await FileService.deleteFile(file.id);
            // Refresh files list after successful deletion
            window.dispatchEvent(new CustomEvent("fetchAllFiles"));
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };
    return (
      <button className="mx-2" onClick={() => onDelete(file.id)}>
          <FaTrashAlt size={18} />
      </button>
    );
};

const RestoreButton = ({ viewingDeletedFiles }) => {
    const { file } = useContext(FileContext);

    const onRestore = async (id) => {
        try {
            await FileService.restoreFile(id);
            // Refresh files list after successful restore
            window.dispatchEvent(new CustomEvent("fetchAllDeletedFiles"));
        } catch (error) {
            console.error("Error restoring file:", error);
        }
    };

    return (
      viewingDeletedFiles && (
        <button onClick={() => onRestore(file.id)}>
            <FaTrashRestoreAlt size={18} className="mr-2 hover:text-green-500" />
        </button>
      )
    );
};

const ForceDeleteButton = ({ viewingDeletedFiles }) => {
    const { file } = useContext(FileContext);

    const onForceDelete = async (id) => {
        try {
            await FileService.forceDelete(id);
            // Refresh files list after successful force delete
            window.dispatchEvent(new CustomEvent("fetchAllDeletedFiles"));
        } catch (error) {
            console.error("Error force deleting file:", error);
        }
    };

    return (
      viewingDeletedFiles && (
        <button onClick={() => onForceDelete(file.id)}>
            <FaBomb size={18} className="mr-2 hover:text-red-500" />
        </button>
      )
    );
};

```

```
    static async deleteFile(id) {
        return await axios.delete(`/api/files/${id}`);
    }

    static async restoreFile(id) {
        return await axios.patch(`/api/files/restore/${id}`);
    }

    static async forceDelete(id) {
        return await axios.delete(`/api/files/force-delete/${id}`);
    }

    static async downloadFile(id, fileName) {
        const response = await axios.get(`/api/files/download/${id}`, { responseType: 'blob' });
        const url = URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
```

And alot of minor changes to existing code from sprintreview 1 for the new feature from sprint 2