import express, { Express, Request, Response } from 'express';
import { MongoClient, MongoClientOptions, Db } from 'mongodb';
import * as mongodb from 'mongodb';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection URI
const mongoUri = 'mongodb+srv://vaugheu:temp2@temp2.hp1lz.mongodb.net/?retryWrites=true&w=majority&appName=temp2';
const dbName = 'portalup';

let db: Db;

// Configure GridFS storage
const storage = new GridFsStorage({
  url: mongoUri,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'uploads'
    };
  }
});

const upload = multer({ storage });

// Connect to MongoDB
const options: MongoClientOptions = {};

MongoClient.connect(mongoUri, options)
  .then((client: import('mongodb').MongoClient) => {
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  })
  .catch((err: Error) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// File upload endpoint
app.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const refreshToken = jwt.sign({ filename: req.file.filename }, process.env.REFRESH_TOKEN_SECRET || 'your-secret-key', { expiresIn: '1h' });
  const tempUrl = `/files/${req.file.filename}?refreshToken=${refreshToken}`;

  // Store file metadata in MongoDB
  const fileMetadata = {
    filename: req.file.filename,
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    expirationTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    refreshToken: refreshToken
  };

  await db.collection('fileMetadata').insertOne(fileMetadata);

  res.status(201).json({ message: 'File uploaded successfully.', temporaryUrl: tempUrl });
});

// File access endpoint
app.get('/files/:filename', async (req: Request, res: Response) => {
  const { filename } = req.params;
  const { refreshToken } = req.query;

  if (!refreshToken) {
    return res.status(401).send('Unauthorized: Refresh token is required.');
  }

  try {
    jwt.verify(refreshToken as string, process.env.REFRESH_TOKEN_SECRET || 'your-secret-key');
  } catch (error) {
    return res.status(403).send('Forbidden: Invalid or expired refresh token.');
  }

  const fileMetadata = await db.collection('fileMetadata').findOne({ filename });

  if (!fileMetadata) {
    return res.status(404).send('File not found.');
  }

  // Serve the file from GridFS
  const bucket = new mongodb.GridFSBucket(db, {
    bucketName: 'uploads'
  });

  const downloadStream = bucket.openDownloadStreamByName(filename);

  res.setHeader('Content-Type', fileMetadata.mimetype);
  downloadStream.pipe(res);
});
