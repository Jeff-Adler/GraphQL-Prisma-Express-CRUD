import { Request, Response, NextFunction } from 'express';
import { Logger } from '@utils/logger';

export const catchAllMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const status = 404;
  const message = 'Invalid request';

  Logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
  res.status(status).json({ message });
};
