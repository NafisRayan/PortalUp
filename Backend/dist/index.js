"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const mongodb = __importStar(require("mongodb"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// MongoDB connection URI
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'portalup';
let db;
// Configure GridFS storage
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url: mongoUri,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            filename: file.originalname,
            bucketName: 'uploads'
        };
    }
});
const upload = (0, multer_1.default)({ storage });
// Connect to MongoDB
const options = {};
mongodb_1.MongoClient.connect(mongoUri, options)
    .then((client) => {
    db = client.db(dbName);
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const refreshToken = jsonwebtoken_1.default.sign({ filename: req.file.filename }, process.env.REFRESH_TOKEN_SECRET || 'your-secret-key', { expiresIn: '1h' });
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
    yield db.collection('fileMetadata').insertOne(fileMetadata);
    res.status(201).json({ message: 'File uploaded successfully.', temporaryUrl: tempUrl });
}));
// File access endpoint
app.get('/files/:filename', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename } = req.params;
    const { refreshToken } = req.query;
    if (!refreshToken) {
        return res.status(401).send('Unauthorized: Refresh token is required.');
    }
    try {
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || 'your-secret-key');
    }
    catch (error) {
        return res.status(403).send('Forbidden: Invalid or expired refresh token.');
    }
    const fileMetadata = yield db.collection('fileMetadata').findOne({ filename });
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
}));
