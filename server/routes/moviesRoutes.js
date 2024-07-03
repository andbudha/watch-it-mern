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
  addDislike,
  fetchLikes,
} from '../controllers/moviesController.js';

const router = express.Router();

router.get('/all', fetchMovies);
router.get('/mymovielist/:userID', fetchMyMovieList);
router.get('/commentaries/:movieID', fetchCommentaries);
router.get('/fetchlikes/:movieID', fetchLikes);
router.post('/addtomylist', addMovieToMyList);
router.post('/removefromlist', removeMovieFromMyList);
router.post('/addcommentary', addCommentary);
router.post('/editcommentary', editCommentary);
router.post('/deletecommentary', deleteCommentary);
router.post('/like', addLike);
router.post('/dislike', addDislike);

export default router;
