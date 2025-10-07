const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    // Allow common document types
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt|rtf|odt/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only document files are allowed!'));
    }
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/document-storage', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Document Schema
const documentSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  fileName: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Document = mongoose.model('Document', documentSchema);

// API Routes
// File upload
app.post('/api/documents/file', upload.single('file'), async (req, res) => {
  try {
    const { key } = req.body;
    
    // Validate input
    if (!key || !req.file) {
      return res.status(400).json({ 
        error: 'Both key and file are required' 
      });
    }

    // Check if key already exists
    const existingDocument = await Document.findOne({ key });
    if (existingDocument) {
      // Delete the uploaded file if key already exists
      fs.unlinkSync(req.file.path);
      return res.status(409).json({ 
        error: 'A document with this key already exists' 
      });
    }

    // Create new document with file info
    const newDocument = new Document({
      key,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      mimeType: req.file.mimetype
    });

    const savedDocument = await newDocument.save();
    
    res.status(201).json({
      message: 'File stored successfully',
      document: {
        id: savedDocument._id,
        key: savedDocument.key,
        fileName: savedDocument.fileName,
        originalName: savedDocument.originalName,
        fileSize: savedDocument.fileSize,
        mimeType: savedDocument.mimeType,
        createdAt: savedDocument.createdAt
      }
    });

  } catch (error) {
    console.error('Error storing file:', error);
    // Clean up uploaded file on error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Get all documents
app.get('/api/documents', async (req, res) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Get document by key
app.get('/api/documents/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const document = await Document.findOne({ key });
    
    if (!document) {
      return res.status(404).json({ 
        error: 'Document not found' 
      });
    }
    
    res.json(document);
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Download file by key
app.get('/api/documents/:key/download', async (req, res) => {
  try {
    const { key } = req.params;
    const document = await Document.findOne({ key });
    
    if (!document) {
      return res.status(404).json({ 
        error: 'Document not found' 
      });
    }
    
    
    // Check if file exists
    if (!fs.existsSync(document.filePath)) {
      return res.status(404).json({ 
        error: 'File not found on server' 
      });
    }
    
    // Set appropriate headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${document.originalName}"`);
    res.setHeader('Content-Type', document.mimeType);
    res.setHeader('Content-Length', document.fileSize);
    
    // Stream the file
    const fileStream = fs.createReadStream(document.filePath);
    fileStream.pipe(res);
    
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
