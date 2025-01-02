import express, { Express, Request, Response } from 'express';
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';
import multer from 'multer';
import cors from 'cors';
import { UploadController } from './controllers/upload.controller';
import { FileController } from './controllers/file.controller';
import { UploadService } from './services/upload.service';
import { FileService } from './services/file.service';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection URI (hardcoded for testing)
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://vaugheu:temp2@temp2.hp1lz.mongodb.net/?retryWrites=true&w=majority&appName=temp2';
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

    // Initialize services and controllers
    const uploadService = new UploadService(db);
    const fileService = new FileService(db);
    const fileController = new FileController(fileService);
    const uploadController = new UploadController(uploadService);

    // File upload endpoint
    app.post('/upload', upload.single('file'), uploadController.uploadFile.bind(uploadController));

    // File access endpoint
    app.get('/files/:fileId', fileController.getFile.bind(fileController));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
