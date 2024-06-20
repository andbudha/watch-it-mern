import express from 'express';
import {
  addMovieToMyList,
  fetchMovies,
  fetchMyMovieList,
  removeMovieFromMyList,
} from '../controllers/moviesController.js';

const router = express.Router();

router.get('/all', fetchMovies);
router.get('/mymovielist/:userID', fetchMyMovieList);
router.post('/addtomylist', addMovieToMyList);
router.post('/removefromlist', removeMovieFromMyList);

export default router;
