import express from 'express';
import {
  addCommentary,
  addMovieToMyList,
  fetchCommentaries,
  fetchMovies,
  fetchMyMovieList,
  removeMovieFromMyList,
} from '../controllers/moviesController.js';

const router = express.Router();

router.get('/all', fetchMovies);
router.get('/mymovielist/:userID', fetchMyMovieList);
router.get('/commentaries/:movieID', fetchCommentaries);
router.post('/addtomylist', addMovieToMyList);
router.post('/removefromlist', removeMovieFromMyList);
router.post('/addcommentary', addCommentary);

export default router;
