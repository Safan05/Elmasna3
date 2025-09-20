import authRouter from './auth.js';
const injectRoutes = (app) => {
  /**
   * @swagger
   * tags:
   *   name: Auth
   *   description: Authentication routes
   */
    app.use('/api/v1/auth', authRouter);
}
export default injectRoutes;
