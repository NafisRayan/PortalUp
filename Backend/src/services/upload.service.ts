import { GridFSBucket, Db, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const REFRESH_TOKEN_SECRET = 'your-secret-key'; // Hardcoded secret key

export class UploadService {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async uploadFile(file: Express.Multer.File): Promise<{ message: string; temporaryUrl: string }> {
    const bucket = new GridFSBucket(this.db, {
      bucketName: 'uploads'
    });

    const uploadStream = bucket.openUploadStream(file.originalname);
    uploadStream.write(file.buffer);
    uploadStream.end();

    return new Promise((resolve, reject) => {
      uploadStream.on('finish', async () => {
        const fileId = uploadStream.id;
        const refreshToken = jwt.sign({ fileId: fileId.toString() }, REFRESH_TOKEN_SECRET, { expiresIn: '1m' });
        const tempUrl = `/files/${fileId}?refreshToken=${refreshToken}`;

        const fileMetadata = {
          _id: fileId, // Store the GridFS file ID
          filename: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          expirationTime: new Date(Date.now() + 60 * 1000), // 1 minute
          refreshToken: refreshToken
        };

        await this.db.collection('fileMetadata').insertOne(fileMetadata);
        resolve({ message: 'File uploaded successfully.', temporaryUrl: tempUrl });
      });

      uploadStream.on('error', (error: any) => {
        console.error('GridFS upload error:', error);
        reject(new Error('Failed to upload file to GridFS.'));
      });
    });
  }
}
