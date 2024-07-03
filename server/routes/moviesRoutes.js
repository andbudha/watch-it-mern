import express from 'express';
import {
  addCommentary,
  addMovieToMyList,
  deleteCommentary,
  editCommentary,
  fetchCommentaries,
  fetchMovies,
  fetchMyMovieList,
  removeMovieFromMyList,
  addLike,
  undoAddLike,
  addDislike,
  undoDislike,
  fetchRatings,
} from '../controllers/moviesController.js';

const router = express.Router();

router.get('/all', fetchMovies);
router.get('/mymovielist/:userID', fetchMyMovieList);
router.get('/commentaries/:movieID', fetchCommentaries);
router.get('/ratings/:movieID', fetchRatings);
router.post('/addtomylist', addMovieToMyList);
router.post('/removefromlist', removeMovieFromMyList);
router.post('/addcommentary', addCommentary);
router.post('/editcommentary', editCommentary);
router.post('/deletecommentary', deleteCommentary);
router.post('/like', addLike);
router.post('/undolike', undoAddLike);
router.post('/dislike', addDislike);
router.post('/undodislike', undoDislike);

export default router;
