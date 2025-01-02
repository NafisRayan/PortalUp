import { Request, Response } from 'express';
import { FileService } from '../services/file.service';
import { ObjectId } from 'mongodb';

export class FileController {
  constructor(private fileService: FileService) {}

  async getFile(req: Request, res: Response): Promise<Response | void> {
    const { fileId } = req.params;
    const { refreshToken } = req.query;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Unauthorized: Refresh token is required.' });
    }

    try {
      const fileStream = await this.fileService.getFile(fileId, refreshToken as string);
      if (!fileStream) {
        return res.status(404).json({ error: 'File not found.' });
      }
      res.setHeader('Content-Type', fileStream.mimeType);
      fileStream.stream.pipe(res);
    } catch (error: any) {
      console.error('File access error:', error);
      return res.status(403).json({ error: error.message || 'Forbidden: Invalid or expired refresh token.' });
    }
  }
}
