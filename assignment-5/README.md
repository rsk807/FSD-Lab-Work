# StegoCloud Storing Extension

A simple Node.js and Express application that allows you to upload and store files using unique keys, with data persistence in MongoDB.

## Features

- Upload and store files (TXT, DOC, DOCX, PDF, RTF, ODT, JPG, PNG, GIF)
- Retrieve files by key
- Download uploaded files
- View all stored files
- Modern, responsive web interface
- MongoDB integration for data persistence
- File size validation (10MB limit)
- Support for multiple file formats

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd assignment-5
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up your MongoDB connection string in the `.env` file:
   ```
   MONGODB_URI=your_mongodb_connection_string_here
   PORT=3000
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

3. Use the web interface to:
   - Upload and store files with unique keys
   - Search for files by key
   - Download uploaded files
   - View all stored files

## API Endpoints

- `POST /api/documents/file` - Upload and store a file
- `GET /api/documents` - Get all files
- `GET /api/documents/:key` - Get file by key
- `GET /api/documents/:key/download` - Download file by key

## Project Structure

```
assignment-5/
├── server.js          # Express server and API routes
├── package.json       # Dependencies and scripts
├── .env              # Environment variables
├── uploads/          # Directory for uploaded files
├── public/           # Static frontend files
│   ├── index.html    # Main HTML page
│   └── styles.css    # CSS styling
└── README.md         # This file
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Multer middleware
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Environment**: dotenv for configuration

## Environment Variables

Create a `.env` file in the root directory with:

```
MONGODB_URI=mongodb://localhost:27017/document-storage
PORT=3000
```

Replace the MongoDB URI with your actual connection string.

## Development

The project includes nodemon for development. Install it globally if needed:

```bash
npm install -g nodemon
```

Then run:

```bash
npm run dev
```

This will automatically restart the server when files change.
