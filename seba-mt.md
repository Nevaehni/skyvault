## Sprint 1 Review
Sprint 1 involved conducting research on Laravel, Next.js, and MediaLibrary, which led to the setup and communication of these technologies with the team member. The focus of the sprint was to work on the upload functionality, differentiate files between different users, and display user files in both the front-end and back-end.

To achieve this, the following steps were taken in the upload functionality:

**Method**

- Created an uploader form in the Next.js front-end to allow users to upload files.
- Created a route in the Laravel application for routing the request to the correct controller.
- Created a controller to handle file uploads.
- Used the Spatie Media Library to store the uploaded file.
- Returned a response to the Next.js front-end indicating whether the upload was successful or not.

**Techniques**

To ensure the upload functionality was robust and efficient, the following techniques were employed:

- Validation of the file type and size was done in the Laravel FileController to ensure that the file met the requirements.
- The Spatie Media Library's addMedia() method was used to store the uploaded file in the /storage/app/media directory.
- Laravel's Storage facade was used to ensure that the file was stored correctly.
- Laravel's Sanctum facade was used to ensure that users could not access other users' files.

Overall, after each new feature was developed, it was transferred to the team member to ensure they were up-to-date with the progress made. By adopting a thorough approach to developing the upload functionality, Codereview sprint 1 was successful in achieving its goals.

## Sprint 2 Review

Sprint 2 focused on implementing access management for user files, allowing users to share their files with other existing users via email, and providing the option to remove sharing if desired. This required building both a back-end using PHP Laravel and a front-end Next.js component. Additionally, some project cleanup was performed and support was provided for a teammate's epic.

### Access Management

#### Methods

To implement access management for user files, the following steps were taken:

1. Added a `user_file_invites` table in the Laravel database to store the relationship between file owners and users who have access to the files.
2. Created a new Laravel controller called `ShareController` to handle sharing and unsharing functionality.
3. Implemented a `ShareService` to handle the business logic for sharing and unsharing files.
4. Used the `ShareController` to call the appropriate methods from the `ShareService` and return the correct HTTP response codes.
5. Created API routes in Laravel for sharing and unsharing files.
6. Developed a Next.js component to allow users to share and unshare files via the front-end interface.
7. Integrated the front-end component with the Laravel back-end using API calls.

#### Techniques

The following techniques were employed to ensure efficient and secure access management:

1. Validation of user input (email address) for sharing and unsharing.
2. Checking for existing shares before creating new ones.
3. Ensuring that only file owners can share and unshare their files.
4. Handling edge cases, such as attempting to share with non-existing users or trying to remove a non-existing share.

### Project Cleanup and Team Collaboration

During Sprint 2, some project cleanup was also performed to improve overall code quality and maintainability:

1. Removed unnecessary code and files.
2. Refactored existing code for better readability and maintainability.
3. Optimized imports and dependencies in both Laravel and Next.js.
4. Collaborated with a teammate on their epic, providing support and guidance as needed.

In conclusion, Sprint 2 was successful in achieving its objectives by implementing access management for user files, providing sharing and unsharing functionality, and improving the overall project quality.

## Sprint 3 Review

In Sprint 3 of the this project, the focus was on implementing robust folder management functionalities. Leveraging the Laravel framework, Spatie Media Library, and Next.js, I created, moved, and managed the lifecycle of folders, including their nested subfolders and files.

**Method**

Here's how I achieved the key objectives:

1. **Creating Folders**: Developed a route in Laravel that points to the appropriate controller, which in turn, handles the creation of folders. Used Spatie Media Library to store folder metadata in a structured manner and responded back to the Next.js front-end on the status of folder creation.

2. **Moving Folders**: Designed a robust moving mechanism for folders and files, ensuring that the nested hierarchy of folders and files is maintained even when they are moved. Laravel's route and controller structure was effectively used for this task. Feedback on the moving operation was provided to the front-end.

3. **Soft-deleting and Recovering Folders**: Implemented a soft-delete functionality, which essentially flags folders (and their respective sub-folders and files) as 'deleted' without physically removing them from the storage. This mechanism also supports the recovery of such 'deleted' folders.

**Techniques**

To ensure the folder management system was robust and efficient, the following techniques were employed:

- **Validation**: For folder creation, the validation of folder name and path was performed in Laravel to ensure adherence to defined rules.

- **Recursion**: A recursive approach was used for the moving, soft-deleting, and recovering of folders and their respective sub-folders and files, thus maintaining the integrity of the nested structure.

- **Laravel Eloquent**: Leveraged Eloquent ORM for managing the 'soft-deleting' and recovery of folders, taking advantage of its simple ActiveRecord implementation for interacting with the database.

- **Spatie Media Library**: The library's rich feature set was used to efficiently handle media storage, manipulation, and retrieval, ensuring our folders and files are stored and retrieved accurately.

Overall, Sprint 3 was successful in achieving its goal of implementing a comprehensive folder management system for the Skyvault project. Each new feature was thoroughly tested and reviewed, ensuring high-quality output. I look forward to bringing more valuable additions to Skyvault in future sprints.

## Sprint 4 Review

In Sprint 4 of the Skyvault project, the focus shifted towards enriching the user interface by streamlining and optimizing image and PDF file handling. This task was achieved by harnessing the potential of Laravel API, Spatie Media Library, and a React component for image loading on the Next.js front-end.

**Method**

Here's the breakdown of the key objectives achieved:

1. **Thumbnail Creation**: Upon the uploading of images and PDFs, a feature was implemented using Laravel API that creates a thumbnail of the file. This thumbnail significantly improves the file loading speed, resulting in a much smoother user experience.

2. **Image Optimization**: Additionally, an optimized version of the uploaded image is created. This image, lighter in size, is more suitable for loading in a browser environment, ensuring the application's performance remains high.

3. **Front-end Image Loader**: On the front-end, a React component was integrated into the Next.js application that enables image loading. This allows users to view images and PDFs directly in the browser without the need for downloading, enhancing the user experience.

**Techniques**

In order to refine the file handling system, the following techniques were used:

- **Spatie Media Library**: This feature-rich library was used for handling image optimizations and thumbnail generation. This has ensured the maintenance of quality while providing a decrease in file size for quicker loading.

- **Laravel Filesystem**: The filesystem in Laravel was used to manage the creation and storage of thumbnails and optimized images, ensuring consistent and efficient handling of image and PDF files.

- **React Image Loader**: A React component was integrated into the Next.js front-end. This enabled images and PDFs to be displayed directly within the web application, improving user interaction and experience.

In conclusion, Sprint 4 successfully contributed to the Skyvault project by significantly improving the handling of image and PDF files. Each newly added feature was exhaustively tested and reviewed, guaranteeing optimal performance. I am eager to contribute more innovative features to Skyvault in the upcoming sprints.

