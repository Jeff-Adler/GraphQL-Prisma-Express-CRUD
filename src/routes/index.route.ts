import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { IndexController } from '@controllers/index.controller';

class IndexRoutes implements Routes {
  readonly path = '/';
  readonly router = Router();
  readonly controller = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.index);

    // this.router.use(`${this.path}users`, new UserRoutes().router);

    // this.router.use(`${this.path}auth`, new AuthRoutes().router);
  }
}

export default IndexRoutes;
