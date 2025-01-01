import express, { Express, Request, Response } from 'express';
import { MongoClient, MongoClientOptions, Db } from 'mongodb';
import * as mongodb from 'mongodb';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection URI (hardcoded for testing)
const mongoUri = 'mongodb+srv://vaugheu:temp2@temp2.hp1lz.mongodb.net/?retryWrites=true&w=majority&appName=temp2';
console.log('MongoDB URI:', mongoUri); // Debugging

const dbName = 'portalup';

let db: Db;

// Configure GridFS storage
const storage = new GridFsStorage({
  url: mongoUri,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'uploads'
    };
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  }
});

// Connect to MongoDB
MongoClient.connect(mongoUri)
  .then((client) => {
    db = client.db(dbName);
    console.log('Connected to MongoDB');
    console.log('Database:', db.databaseName); // Debugging
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// File upload endpoint
app.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  console.log('Upload request received:', req.file);
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  try {
    const refreshToken = jwt.sign({ filename: req.file.filename }, process.env.REFRESH_TOKEN_SECRET || 'your-secret-key', { expiresIn: '1h' });
    const tempUrl = `/files/${req.file.filename}?refreshToken=${refreshToken}`;

    const fileMetadata = {
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      expirationTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      refreshToken: refreshToken
    };

    console.log('File metadata:', fileMetadata); // Debugging

    await db.collection('fileMetadata').insertOne(fileMetadata);

    res.status(201).json({ message: 'File uploaded successfully.', temporaryUrl: tempUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// File access endpoint
app.get('/files/:filename', async (req: Request, res: Response) => {
  const { filename } = req.params;
  const { refreshToken } = req.query;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Unauthorized: Refresh token is required.' });
  }

  try {
    jwt.verify(refreshToken as string, process.env.REFRESH_TOKEN_SECRET || 'your-secret-key');

    const fileMetadata = await db.collection('fileMetadata').findOne({ filename });

    if (!fileMetadata) {
      return res.status(404).json({ error: 'File not found.' });
    }

    const bucket = new mongodb.GridFSBucket(db, {
      bucketName: 'uploads'
    });

    console.log('GridFS Bucket initialized:', bucket); // Debugging

    const downloadStream = bucket.openDownloadStreamByName(filename);

    res.setHeader('Content-Type', fileMetadata.mimetype);
    downloadStream.pipe(res);
  } catch (error) {
    console.error('File access error:', error);
    res.status(403).json({ error: 'Forbidden: Invalid or expired refresh token.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});