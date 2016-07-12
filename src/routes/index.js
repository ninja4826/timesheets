import { Router } from 'express';
// import { Month, Entry } from '../models';
import { makeRoutes as monthRoutes } from './months';
import { makeRoutes as entryRoutes } from './entries';

export function makeRoutes() {
  let router = Router();
  
  router.use('/months', monthRoutes());
  router.use('/entries', entryRoutes());
  
  return router;
}