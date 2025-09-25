import authRouter from './auth.js';
import usersRouter from './users.js';
import adminRouter from './admin.js';
const injectRoutes = (app) => {
  /**
   * @swagger
   * tags:
   *   name: Auth
   *   description: Authentication routes
   */
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', usersRouter);
    app.use('/api/v1/admin',adminRouter)
}
export default injectRoutes;
