// src/router/index.ts
import { AppRouter } from '../core/Decorators';
import Post from '../controllers/Post';
import Book from '../controllers/Book';

const appRouter = new AppRouter();

appRouter.mount(Post).mount(Book);

export default appRouter.router;
