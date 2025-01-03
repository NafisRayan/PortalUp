# PortalUp - File Uploader

File Uploader is a web application that allows users to easily upload files and receive a temporary URL to share or access them. It supports various file types including images, text files, PDFs, and documents.

## Core Functionalities

*   **File Upload:** Users can upload files by dragging and dropping them onto the designated area or by selecting them using the file input.
*   **Temporary URL Generation:** Upon successful upload, the application generates a temporary URL that can be used to access the uploaded file.
*   **File Access:** By visiting the generated temporary URL, users can download the originally uploaded file.
*   **Automatic Expiration:** The generated URLs are temporary and expire automatically after a short period (approximately 1 minute).

## Features

*   **User-Friendly Interface:** The frontend is built with React and styled with Tailwind CSS, providing a clean and intuitive user experience.
*   **Drag and Drop Support:** Users can easily drag and drop files for upload.
*   **File Preview:** For certain file types, a preview is displayed before uploading.
*   **Progressive Upload:** While not explicitly shown in the provided code, the architecture allows for potential implementation of upload progress indicators.
*   **Temporary Access:** Ensures that uploaded files are not permanently stored and access is time-limited, enhancing privacy and security.
*   **Multiple File Type Support:** Supports uploading of images, text files, PDFs, and document files.
*   **File Size Limit:**  Uploads are limited to a maximum file size of 5MB.
*   **Navigation:** A navigation bar allows users to easily switch between the Home, Upload, and About pages.
*   **Informative Pages:**
    *   **Home:** Provides a welcoming message and a link to the upload page.
    *   **Upload:**  The main interface for uploading files.
    *   **About:**  Offers a brief description of the application.
    *   **404 - Page Not Found:**  Displays a helpful message when a user navigates to an invalid route.


## Running the Project

To run the File Uploader project, follow these steps:

### Backend

1. Navigate to the Backend directory:
   ```bash
   cd .\Backend\
   ```

2. Install the dependencies:
   ```bash
   npm i
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the Frontend directory:
   ```bash
   cd .\Frontend\
   ```

2. Install the dependencies:
   ```bash
   npm i
   ```

3. Start the development server:
   ```bash
   npm start
   ```

Run backend first and than the frontend.



## Backend Details

The backend is built using Node.js with the Express framework and utilizes MongoDB with GridFS for file storage.

*   **Framework:** Express.js is used to create the API endpoints for file uploads and access.
*   **Database:** MongoDB is used to store file metadata and GridFS is employed for efficient storage of large files.
*   **File Storage:** GridFS stores the uploaded files in chunks within the MongoDB database.
*   **Temporary URLs:** JSON Web Tokens (JWT) are used to create temporary, signed URLs. These tokens include an expiration time.
*   **Authentication (Temporary):** The refresh token passed in the query parameter of the temporary URL is verified using the `REFRESH_TOKEN_SECRET`.
*   **Middleware:**
    *   `express.json()`:  Parses incoming requests with JSON payloads.
    *   `cors()`: Enables Cross-Origin Resource Sharing for the frontend to communicate with the backend.
    *   `multer()`: Handles file uploads. Files are stored in memory temporarily before being streamed to GridFS.
*   **Endpoints:**
    *   `/upload`:  Handles file uploads. It receives the file, stores it in GridFS, generates a temporary URL with a JWT, and saves file metadata (including the refresh token and expiration time) in a `fileMetadata` collection.
    *   `/files/:fileId`:  Allows access to uploaded files using the file's ID and a valid refresh token. It verifies the token and then streams the file from GridFS to the response.

## Frontend Details

The frontend is a single-page application built with React.

*   **Library:** React is used for building the user interface and managing component state.
*   **Styling:** Tailwind CSS provides utility classes for styling the application.
*   **Routing:** `react-router-dom` is used for navigation between different pages.
*   **Components:**
    *   **`Navbar`:**  A navigation bar with links to Home, Upload, and About pages.
    *   **`FileUpload`:**  Handles the file upload functionality, including drag and drop, file selection, and communication with the backend.
*   **Pages:**
    *   **`Home`:**  The landing page with a brief introduction and a link to the upload page.
    *   **`Upload`:**  The page containing the `FileUpload` component.
    *   **`About`:**  Provides information about the File Uploader application.
    *   **`NotFound`:**  Displayed when the user navigates to a non-existent route.

## How to Use

1. Navigate to the Upload page.
2. Drag and drop a file onto the designated area or click to select a file from your computer.
3. Click the "Upload" button.
4. Upon successful upload, a "Download File" button will appear with the temporary URL. This URL is valid for approximately one minute.
5. Click the "Download File" button to download the uploaded file.

**Note:** The temporary URLs expire after approximately 1 minute.