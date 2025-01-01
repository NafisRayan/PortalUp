import express, { Express, Request, Response } from 'express';
import { MongoClient, Db, GridFSBucket } from 'mongodb';
import * as mongodb from 'mongodb';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import cors from 'cors';

dotenv.config();

const REFRESH_TOKEN_SECRET = 'your-secret-key'; // Hardcoded secret key

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors())// MongoDB connection URI (hardcoded for testing)
const mongoUri = 'mongodb+srv://vaugheu:temp2@temp2.hp1lz.mongodb.net/?retryWrites=true&w=majority&appName=temp2';
console.log('MongoDB URI:', mongoUri); // Debugging

const dbName = 'portalup';

let db: Db;

// Multer for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

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
    const bucket = new GridFSBucket(db, {
      bucketName: 'uploads'
    });

    let uploadStream: mongodb.GridFSBucketWriteStream;
    if (req.file) {
      uploadStream = bucket.openUploadStream(req.file.originalname);
      uploadStream.write(req.file.buffer);
      uploadStream.end();

      uploadStream.on('finish', async () => {
        const fileId = uploadStream.id;
        const refreshToken = jwt.sign({ fileId: fileId.toString() }, REFRESH_TOKEN_SECRET, { expiresIn: '1m' });
        const tempUrl = `/files/${fileId}?refreshToken=${refreshToken}`;

        const fileMetadata = {
          _id: fileId, // Store the GridFS file ID
          filename: req.file?.originalname,
          mimetype: req.file?.mimetype,
          size: req.file?.size,
          expirationTime: new Date(Date.now() + 60 * 1000), // 1 minute
          refreshToken: refreshToken
        };

        await db.collection('fileMetadata').insertOne(fileMetadata);
        res.status(201).json({ message: 'File uploaded successfully.', temporaryUrl: tempUrl });
      });

      uploadStream.on('error', (error) => {
        console.error('GridFS upload error:', error);
        res.status(500).json({ error: 'Failed to upload file to GridFS.' });
      });
    }

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// File access endpoint
app.get('/files/:fileId', async (req: Request, res: Response) => {
  const { fileId } = req.params;
  const { refreshToken } = req.query;

  console.log('File access request received with fileId:', fileId);

  if (!refreshToken) {
    return res.status(401).json({ error: 'Unauthorized: Refresh token is required.' });
  }

    try {
      jwt.verify(refreshToken as string, REFRESH_TOKEN_SECRET);

      console.log('Attempting to find file metadata with _id:', fileId);
      const fileMetadata = await db.collection('fileMetadata').findOne({ _id: new mongodb.ObjectId(fileId) });

      if (!fileMetadata) {
        console.log('File metadata not found.');
        return res.status(404).json({ error: 'File not found.' });
      }

    const bucket = new GridFSBucket(db, {
      bucketName: 'uploads'
    });

    console.log('Opening download stream with fileId:', fileId);
    const downloadStream = bucket.openDownloadStream(new mongodb.ObjectId(fileId));

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
