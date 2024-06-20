import express from 'express';
import {
  addMovieToMyList,
  fetchMovies,
  removeMovieFromMyList,
} from '../controllers/moviesController.js';

const router = express.Router();

router.get('/all', fetchMovies);
router.post('/addtomylist', addMovieToMyList);
router.post('/removefromlist', removeMovieFromMyList);

export default router;
