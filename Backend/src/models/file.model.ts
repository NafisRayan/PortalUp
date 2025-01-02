import { ObjectId } from 'mongodb';

export class FileModel {
  _id: ObjectId;
  filename?: string;
  mimetype?: string;
  size?: number;
  expirationTime?: Date;
  refreshToken?: string;

  constructor(data: {
    _id: ObjectId;
    filename?: string;
    mimetype?: string;
    size?: number;
    expirationTime?: Date;
    refreshToken?: string;
  }) {
    this._id = data._id;
    this.filename = data.filename;
    this.mimetype = data.mimetype;
    this.size = data.size;
    this.expirationTime = data.expirationTime;
    this.refreshToken = data.refreshToken;
  }
}
