import express from 'express';
import setupConfiguration from './modules/setUpConfiguration.js';
import setupMiddlewares from './modules/setUpMiddlewares.js';
import setupRoutes from './modules/setUpRoutes.js';
import setupErrorHandlers from './modules/setUpErrorHandlers.js';
import setupServer from './modules/setUpServer.js';

setupConfiguration();

// LA APP
const PORT = process.env.PORT || 3000;
const app = express();

setupMiddlewares(app);
setupRoutes(app);

// Arrancar el servidor
setupErrorHandlers(app);
setupServer(app, PORT);

export default app;