import express from 'express';
import cors from 'cors';
import router from './routes/moviesRoutes.js';
import colors from 'colors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

const addMiddleWares = () => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

const startServer = () => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`The server is running on port: ${port}`);
  });
};

const loadRoutes = () => {
  app.use('/movieit/movies', router);
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
