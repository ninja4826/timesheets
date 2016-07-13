import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { initializeDatabase } from './models';
import { makeRoutes } from './routes';
// import { makeRoutes } from './__routes';

mongoose.Promise = Promise;

initializeDatabase();
let publicPath = path.join(__dirname, '..', 'public', 'dist');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));

app.use('/api', makeRoutes());

app.use('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

export default app;