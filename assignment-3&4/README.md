# StegoCloud Frontend

A secure document storage and sharing web application frontend built with plain HTML, CSS, and JavaScript. This is a demonstration frontend that showcases the StegoCloud concept with mock functionality.

## Features

- **Document Upload**: Drag & drop or browse to upload documents
- **Encryption Simulation**: Mock encryption process with visual feedback
- **Stego-Image Generation**: Creates a mock stego-image containing the "hidden" key
- **Document Access**: Enter document link and upload stego-image to "decrypt"
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Toast Notifications**: User feedback for all actions
- **File Validation**: Checks file types and sizes

## Project Structure

```
stegoCloud/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## How to Run

### Method 1: Simple File Opening
1. Navigate to the project directory:
   ```bash
   cd /Users/ashishsharma/codes/stegoCloud
   ```

2. Open the `index.html` file in your web browser:
   - **macOS**: Double-click `index.html` or right-click → "Open with" → your preferred browser
   - **Windows**: Double-click `index.html` or right-click → "Open with" → your preferred browser
   - **Linux**: Double-click `index.html` or use `xdg-open index.html`

### Method 2: Using a Local Server (Recommended)
For the best experience, serve the files through a local server:

#### Using Python (if installed):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

#### Using Node.js (if installed):
```bash
# Install a simple server globally
npm install -g http-server

# Run the server
http-server -p 8000
```

Then open: `http://localhost:8000`

#### Using PHP (if installed):
```bash
php -S localhost:8000
```

Then open: `http://localhost:8000`

## Usage Instructions

### Uploading a Document
1. **Select a File**: 
   - Drag and drop a file onto the upload area, or
   - Click "browse files" to select from your computer
   - Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG
   - Maximum file size: 10MB

2. **Upload Process**:
   - Click "Encrypt & Upload" button
   - Wait for the processing animation (2 seconds)
   - You'll receive a document link and a downloadable stego-image

3. **Save Your Files**:
   - Copy the document link (click the copy button)
   - Download the stego-image (click the download button)
   - **Important**: Keep both files safe - you need both to access your document!

### Accessing a Document
1. **Enter Document Link**: Paste the document link you received
2. **Upload Stego-Image**: Upload the stego-image file you downloaded
3. **Decrypt**: Click "Decrypt & Access" to download the decrypted file

## Demo Features

This is a **mock implementation** for demonstration purposes. The following features are simulated:

- ✅ File upload validation
- ✅ Encryption/decryption process (visual only)
- ✅ Stego-image generation (mock image with gradient)
- ✅ Document link generation
- ✅ File download simulation
- ✅ Toast notifications
- ✅ Loading animations
- ✅ Responsive design

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Development Notes

### Mock Functionality
- No actual encryption/decryption is performed
- Stego-images are generated client-side as simple gradient images
- File downloads are simulated with mock content
- All network requests are simulated with timeouts

### Security Note
This is a **frontend demonstration only**. In a real implementation:
- Encryption would happen server-side
- Stego-images would contain actual hidden data
- File storage would be secure and encrypted
- Authentication and authorization would be implemented

## Customization

### Styling
- Modify `styles.css` to change colors, fonts, or layout
- The design uses CSS Grid and Flexbox for responsive layout
- Color scheme can be changed by modifying the CSS custom properties

### Functionality
- Edit `script.js` to modify behavior
- Add new features or change the mock implementation
- All functions are well-documented with comments

## Troubleshooting

### File Won't Upload
- Check file type is supported (PDF, DOC, DOCX, TXT, JPG, PNG)
- Ensure file size is under 10MB
- Try refreshing the page

### Styling Issues
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for any JavaScript errors
- Ensure all files are in the same directory

### Local Server Issues
- Make sure no other application is using port 8000
- Try a different port: `python -m http.server 8080`
- Check firewall settings if connection is blocked

## Future Enhancements

For a complete implementation, consider adding:
- Backend API integration
- Real encryption/decryption
- User authentication
- File management dashboard
- Sharing permissions
- Audit logs
- Mobile app

## License

This is a demonstration project for educational purposes.
