import mongoose from 'mongoose';
import config from 'config';

export function initializeDatabase() {
  let host = config.get('db.host');
  let port = config.get('db.port');
  let name = config.get('db.name');
  let uri = `mongodb://${host}:${port}/${name}`;
  console.log('connecting to:', uri);
  mongoose.connect(uri);
}

export * from './month';
export * from './entry';