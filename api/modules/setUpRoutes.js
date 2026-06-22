import usersRoutes from './users/users.routes.js';
import authRoutes from './auth/auth.routes.js';
import cartRoutes from './cart/cart.routes.js';
import ingredientRoutes from './ingredient/ingredient.routes.js';
import plateRoutes from './plate/plate.routes.js';

const setupRoutes = (app) => {
  app.use('/users', usersRoutes);
  app.use('/auth', authRoutes);
  app.use('/cart', cartRoutes);
  app.use('/ingredient', ingredientRoutes);
  app.use('/plate', plateRoutes);
};

export default setupRoutes;
