import config from '@/config';
import { morganMiddleware } from '@middlewares/morganMiddleware';
import { Logger } from '@utils/logger';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import IndexRoutes from '@routes/index.route';
import errorMiddleware from '@middlewares/errorMiddleware';
import { catchAllMiddleware } from '@middlewares/catchAllMiddleware';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  public constructor() {
    this.app = express();
    this.port = config.get('port') || 3000;
    this.env = config.get('env') || 'development';

    // this.env !== 'testing' && this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      Logger.info(`=================================`);
      Logger.info(`======= ENV: ${this.env} =======`);
      Logger.info(`🚀 App listening on port ${this.port}`);
      Logger.info(`=================================`);
    });
  }

  private initializeMiddlewares(): void {
    this.app.use(compression());
    this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(hpp({ whitelist: ['order'] }));
    this.app.use(morganMiddleware);
  }

  private initializeRoutes(): void {
    this.app.use('/', new IndexRoutes().router);
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
    this.app.use(catchAllMiddleware);
  }
}

export default App;
