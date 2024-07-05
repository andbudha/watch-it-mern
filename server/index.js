import express from 'express';
import cors from 'cors';
import moviesRouter from './routes/moviesRoutes.js';
import usersRouter from './routes/usersRoutes.js';
import colors from 'colors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import passport from 'passport';
import passportStrategy from './config/passportConfig.js';
import { cloudinaryConfig } from './config/cloudinary.js';

dotenv.config();
const app = express();

const addMiddleWares = () => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());
  passport.use(passportStrategy);
  cloudinaryConfig();
};

const startServer = () => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`The server is running on port: ${port}`);
  });
};

const loadRoutes = () => {
  app.use('/movieit/movies', moviesRouter);
  app.use('/movieit/users', usersRouter);
  app.use('*', (_, res) => {
    res.status(404).json({ message: 'Page not found!' });
  });
};

const gettingConnectedWithMongoDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_DB);
    if (response) {
      console.log('Connection with MongoDB established!'.bgGreen);
    }
  } catch (error) {
    if (error) {
      console.log('Failed to connect with MongoDB!'.bgRed);
    }
  }
};

(async function controller() {
  await gettingConnectedWithMongoDB();
  addMiddleWares();
  loadRoutes();
  startServer();
})();
