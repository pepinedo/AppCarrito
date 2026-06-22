import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import logger from 'morgan';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const setupMiddlewares = (app) => {
  app.use(logger('dev'));
  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '../../public')));
};

export default setupMiddlewares;
