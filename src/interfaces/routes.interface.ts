import { Router } from 'express';

export interface Routes {
  readonly path?: string;
  readonly router: Router;
}
