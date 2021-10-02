import config from '@/config';
import morgan, { StreamOptions } from 'morgan';

import { Logger } from '@utils/logger';

const stream: StreamOptions = {
  write: (message) => Logger.http(message)
};

const skip = () => {
  const env = config.get('env') || 'development';
  return env !== 'development';
};

export const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms', {
  stream,
  skip
});
