import { Request, Response } from 'express';
import { UploadService } from '../services/upload.service';

export class UploadController {
  constructor(private uploadService: UploadService) {}

  async uploadFile(req: Request, res: Response): Promise<Response> {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    try {
      const result = await this.uploadService.uploadFile(req.file);
      return res.status(201).json(result);
    } catch (error: any) {
      console.error('Upload error:', error);
      return res.status(500).json({ error: error.message || 'Internal server error.' });
    }
  }
}
