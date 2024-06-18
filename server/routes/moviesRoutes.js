import express from 'express';
import MovieModel from '../models/movieModel.js';

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const movies = await MovieModel.find();
    res.status(200).json({ message: 'Movies fetched!', movies });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
