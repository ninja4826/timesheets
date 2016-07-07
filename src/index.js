import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { initializeDatabase } from './models';
import { makeRoutes } from './routes';

mongoose.Promise = Promise;

initializeDatabase();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', makeRoutes());

export default app;