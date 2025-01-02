import { ObjectId } from 'mongodb';

export interface FileMetadata {
  _id: ObjectId;
  filename?: string;
  mimetype?: string;
  size?: number;
  expirationTime?: Date;
  refreshToken?: string;
}
