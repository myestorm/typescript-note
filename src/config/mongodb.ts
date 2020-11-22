// src/config/mongodb.ts
import path from 'path';
import { ConnectionOptions } from 'typeorm';

// mongodb的连接配置
export const mongoOptions: ConnectionOptions = {
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  username: '',
  password: '',
  database: 'comments',
  synchronize: true,
  entities: [
    path.join(__dirname, '../entity/*.{ts, js}')
  ],
  useUnifiedTopology: true,
  logging: true
};

export default {
  mongoOptions
}
