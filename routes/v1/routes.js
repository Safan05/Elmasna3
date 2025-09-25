import authRouter from './auth.js';
import usersRouter from './users.js';
const injectRoutes = (app) => {
  /**
   * @swagger
   * tags:
   *   name: Auth
   *   description: Authentication routes
   */
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', usersRouter);
}
export default injectRoutes;
