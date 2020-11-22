// src/app.ts
import path from 'path';
import Koa from 'koa';
import koaStatic from 'koa-static';
import bodyParser from 'koa-bodyparser';

import { createConnection } from 'typeorm';
import { mongoOptions } from './config/mongodb';

import router from './router/index'; // 加入路由

createConnection(mongoOptions).then(async () => { // 创建数据库连接

  const app = new Koa();

  // Middlewares
  app.use(bodyParser());
  app.use(koaStatic(path.join(__dirname, '../public')));

  app.use(router.routes()).use(router.allowedMethods()); // 挂载到APP上

  app.listen(3000, () => {
    console.log('application is running on port 3000');
  })
}).catch((error: any) => console.log('TypeORM connection error: ', error));
