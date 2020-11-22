// src/core/Decorators.ts
import 'reflect-metadata';
import Router from 'koa-router';

const router = new Router();

// 定义一个http请求的枚举类型
export enum HttpMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DEL = 'del',
  All = 'all'
}

// 前缀装饰器，类型是类装饰器
export function prefix (path: string): ClassDecorator {
  return (target: Function) => {
    // 把前缀存起来
    Reflect.defineMetadata('prefix', path, target);
  };
}

// 用工厂生成http请求装饰器 post get等
export function httpRequestDecorator (method: HttpMethods) {
  return function (path: string) {
    return function (target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', method, target, key);
    };
  };
}

export const get = httpRequestDecorator(HttpMethods.GET);
export const post = httpRequestDecorator(HttpMethods.POST);
export const put = httpRequestDecorator(HttpMethods.PUT);
export const del = httpRequestDecorator(HttpMethods.DEL);
export const all = httpRequestDecorator(HttpMethods.All);

// 挂载路由
export function getRouter (): Router {
  return router;
}

export class AppRouter {
  router: Router;

  constructor () {
    this.router = getRouter();
  };

  mount (controller: Function) {
    const prefix = Reflect.getMetadata('prefix', controller);
    const keys = Object.keys(controller.prototype)
    keys.forEach(key => {
      const path: string = Reflect.getMetadata('path', controller.prototype, key);
      const method: HttpMethods = Reflect.getMetadata('method', controller.prototype, key);
      const hanlder = controller.prototype[key];
      if (path && method && hanlder) {
        router[method](prefix + path, hanlder);
      }
    })
    return this;
  };
}
