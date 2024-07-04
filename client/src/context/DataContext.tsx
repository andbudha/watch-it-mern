import { ReactNode, createContext, useContext, useState } from 'react';
import { CommentaryType, ListMovieType, Movies } from '../types/common_types';
import axios, { AxiosError } from 'axios';
import { AuthContext } from './AuthContext';
import { toastError } from '../assets/utils/failedToast';
import { baseUrl } from '../assets/utils/baseUrl';
import { successfulToast } from '../assets/utils/successfulToast';

type DataContextType = {
  likes: String[] | null;
  dislikes: String[] | null;
  fetchRatings: (movieID: string) => Promise<void>;
  addDislike: (movieID: string, userID: string) => Promise<void>;
  addLike: (movieID: string, userID: string) => Promise<void>;
  undoAddLike: (movieID: string, userID: string) => Promise<void>;
  undoAddDislike: (movieID: string, userID: string) => Promise<void>;
  searchInputValue: string;
  setSearchInputValue: (newSearchInoutValue: string) => void;
  movies: Movies | null;
  myMovieList: ListMovieType[] | null;
  commentaries: CommentaryType[] | null;
  fetchMovies: () => Promise<void>;
  fetchMyMovieList: (userID: string) => Promise<void>;
  addMovieToMyList: (movieID: string, userID: string) => Promise<void>;
  removeMovieFromMyList: (movieID: string, userID: string) => Promise<void>;
  addCommentary: (
    movieID: string,
    newCommentary: CommentaryType
  ) => Promise<void>;
  editCommentary: (
    movieID: string,
    commentaryID: string,
    editedCommentary: string,
    setShowEditBox: Function
  ) => Promise<void>;
  deleteCommentary: (movieID: string, commentaryID: string) => Promise<void>;
  getCommentaries: (movieID: string) => Promise<void>;
};

type DataProviderProps = { children: ReactNode };

const initialDataContextState = {
  likes: null,
  dislikes: null,
  fetchRatings: () => Promise.resolve(),
  addDislike: () => Promise.resolve(),
  addLike: () => Promise.resolve(),
  undoAddLike: () => Promise.resolve(),
  undoAddDislike: () => Promise.resolve(),
  searchInputValue: '',
  setSearchInputValue: (newSearchInoutValue: string) => newSearchInoutValue,
  movies: [] as Movies,
  myMovieList: [] as ListMovieType[],
  commentaries: [] as CommentaryType[],
  fetchMovies: () => Promise.resolve(),
  fetchMyMovieList: () => Promise.resolve(),
  addMovieToMyList: () => Promise.resolve(),
  removeMovieFromMyList: () => Promise.resolve(),
  addCommentary: () => Promise.resolve(),
  editCommentary: () => Promise.resolve(),
  deleteCommentary: () => Promise.resolve(),
  getCommentaries: () => Promise.resolve(),
} as DataContextType;

export const DataContext = createContext(initialDataContextState);

export const DataProvider = ({ children }: DataProviderProps) => {
  const { setIsLoading, user } = useContext(AuthContext);
  const [movies, setMovies] = useState<null | Movies>(null);
  const [myMovieList, setMyMovieList] = useState<null | ListMovieType[]>(null);
  const [commentaries, setCommentaries] = useState<null | CommentaryType[]>(
    null
  );
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [likes, setLikes] = useState<String[] | null>(null);
  const [dislikes, setDisikes] = useState<String[] | null>(null);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${baseUrl}/movies/all`);
      if (response) {
        setMovies(response.data.movies);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toastError(error.message);
      } else {
        console.log(error);
      }
    }
  };

  const fetchMyMovieList = async (userID: string) => {
    try {
      const response = await axios.get(
        `${baseUrl}/movies/mymovielist/${userID}`
      );
      if (response) {
        setMyMovieList(response.data);
      }
    } catch (error) {}
  };

  const addMovieToMyList = async (movieID: string, userID: string) => {
    try {
      const response = await axios.post(`${baseUrl}/movies/addtomylist`, {
        movieID,
        userID,
      });
      if (response.data.message) {
        fetchMyMovieList(user!.userID);
        successfulToast(response.data.message);
      }
    } catch (error) {}
  };

  const removeMovieFromMyList = async (movieID: string, userID: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/movies/removefromlist`, {
        userID,
        movieID,
      });
      if (response) {
        fetchMyMovieList(user!.userID);
        successfulToast(response.data.message);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const getCommentaries = async (movieID: string) => {
    try {
      const response = await axios.get(
        `${baseUrl}/movies/commentaries/${movieID}`
      );
      if (response) {
        setCommentaries(response.data.movie[0].commentaries);
      }
    } catch (error) {}
  };

  const addCommentary = async (
    movieID: string,
    newCommentary: CommentaryType
  ) => {
    try {
      const response = await axios.post(`${baseUrl}/movies/addcommentary`, {
        movieID,
        newCommentary,
      });
      if (response) {
        successfulToast(response.data.message);
        getCommentaries(movieID);
      }
    } catch (error) {}
  };

  const editCommentary = async (
    movieID: string,
    commentaryID: string,
    editedCommentary: string,
    setShowEditBox: Function
  ) => {
    try {
      const response = await axios.post(`${baseUrl}/movies/editcommentary`, {
        movieID,
        commentaryID,
        editedCommentary,
      });
      if (response) {
        console.log(response.data.message);

        successfulToast(response.data.message);
        getCommentaries(movieID);
        setShowEditBox(false);
      }
    } catch (error: any) {
      console.log(error.code);
    }
  };
  const deleteCommentary = async (movieID: string, commentaryID: string) => {
    try {
      const response = await axios.post(`${baseUrl}/movies/deletecommentary`, {
        movieID,
        commentaryID,
      });
      if (response) {
        successfulToast(response.data.message);
        getCommentaries(movieID);
      }
    } catch (error) {}
  };

  const addLike = async (movieID: string, userID: string) => {
    try {
      const response = await axios.post(`${baseUrl}/movies/like`, {
        movieID,
        userID,
      });
      if (response) {
        fetchRatings(movieID);
      }
    } catch (error) {}
  };

  const undoAddLike = async (movieID: string, userID: string) => {
    try {
      const response = await axios.post(`${baseUrl}/movies/undolike`, {
        movieID,
        userID,
      });
      if (response) {
        fetchRatings(movieID);
      }
    } catch (error) {}
  };

  const addDislike = async (movieID: string, userID: string) => {
    try {
      const response = await axios.post(`${baseUrl}/movies/dislike`, {
        movieID,
        userID,
      });
      if (response) {
        fetchRatings(movieID);
      }
    } catch (error) {}
  };

  const undoAddDislike = async (movieID: string, userID: string) => {
    try {
      const response = await axios.post(`${baseUrl}/movies/undodislike`, {
        movieID,
        userID,
      });
      if (response) {
        fetchRatings(movieID);
      }
    } catch (error) {}
  };
  const fetchRatings = async (movieID: string) => {
    try {
      const response = await axios.get(`${baseUrl}/movies/ratings/${movieID}`);
      if (response) {
        setLikes(response.data.likes);
        setDisikes(response.data.dislikes);
      }
    } catch (error) {}
  };

  return (
    <DataContext.Provider
      value={{
        likes,
        dislikes,
        fetchRatings,
        addDislike,
        addLike,
        undoAddLike,
        undoAddDislike,
        searchInputValue,
        setSearchInputValue,
        fetchMovies,
        fetchMyMovieList,
        movies,
        addMovieToMyList,
        removeMovieFromMyList,
        addCommentary,
        editCommentary,
        commentaries,
        getCommentaries,
        myMovieList,
        deleteCommentary,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
