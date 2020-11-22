// src/controllers/Post.ts
import { Context, Next } from 'koa';
import { getManager } from 'typeorm';
import { prefix, get, post } from '../core/Decorators';

import { Post } from '../entity/Post';

@prefix('/post') // 期望有个前缀约束 /post/list /post/add
export default class PostController {
  @get('/list')
  async List (ctx: Context) {
    const postRepository = getManager().getRepository(Post);
    const posts = await postRepository.find();
    ctx.body = posts;
  }
  @post('/add')
  async Add (ctx: Context) {
    const data = ctx.request.body || {};
    const postRepository = getManager().getRepository(Post);
    data.create = new Date()
    try {
      const res = await postRepository.save(data);
      ctx.body = {
        code: 0,
        data: res
      }
    } catch (err) {
      ctx.body =  {
        code: 1,
        data: err
      }
    }
  }
}
