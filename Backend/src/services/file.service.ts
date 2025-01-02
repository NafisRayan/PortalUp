import { Db, ObjectId, GridFSBucket, GridFSBucketReadStream } from 'mongodb';
import jwt from 'jsonwebtoken';

const REFRESH_TOKEN_SECRET = 'your-secret-key'; // Hardcoded secret key

export class FileService {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async getFile(fileId: string, refreshToken: string): Promise<{ stream: GridFSBucketReadStream, mimeType: string } | null> {
    try {
      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

      const fileMetadata = await this.db.collection('fileMetadata').findOne({ _id: new ObjectId(fileId) });

      if (!fileMetadata) {
        return null;
      }

      const bucket = new GridFSBucket(this.db, {
        bucketName: 'uploads'
      });

      const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));
      return { stream: downloadStream, mimeType: fileMetadata?.mimetype };
    } catch (error) {
      console.error('File access error:', error);
      throw new Error('Forbidden: Invalid or expired refresh token.');
    }
  }
}
