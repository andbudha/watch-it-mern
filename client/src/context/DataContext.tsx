import { ReactNode, createContext, useContext, useState } from 'react';
import {
  CommentaryType,
  ListMovieType,
  LoaderStateType,
  Movies,
} from '../types/common_types';
import axios, { AxiosError } from 'axios';
import { AuthContext } from './AuthContext';
import { toastError } from '../assets/utils/failedToast';
import { baseUrl } from '../assets/utils/baseUrl';
import { successfulToast } from '../assets/utils/successfulToast';

type DataContextType = {
  loaderStatus: string;
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
  loaderStatus: 'idle',
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
  const [loaderStatus, setLoaderStatus] = useState<LoaderStateType>('idle');

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/movies/all`);
      if (response) {
        setIsLoading(false);
        setMovies(response.data.movies);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toastError(error.message);
      } else {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMyMovieList = async (userID: string) => {
    try {
      const response = await axios.get(
        `${baseUrl}/movies/mymovielist/${userID}`
      );
      if (response) {
        setMyMovieList(response.data);
        setLoaderStatus('idle');
      }
    } catch (error) {
    } finally {
    }
  };

  const addMovieToMyList = async (movieID: string, userID: string) => {
    setLoaderStatus('addingMovie');
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
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/movies/commentaries/${movieID}`
      );
      if (response) {
        setCommentaries(response.data.movie[0].commentaries);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const addCommentary = async (
    movieID: string,
    newCommentary: CommentaryType
  ) => {
    setLoaderStatus('addingPost');
    try {
      const response = await axios.post(`${baseUrl}/movies/addcommentary`, {
        movieID,
        newCommentary,
      });
      if (response) {
        successfulToast(response.data.message);
        getCommentaries(movieID);
      }
    } catch (error) {
    } finally {
      setLoaderStatus('idle');
    }
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
    } finally {
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
    } catch (error) {
    } finally {
    }
  };

  const addLike = async (movieID: string, userID: string) => {
    try {
      const response = await axios.post(`${baseUrl}/movies/like`, {
        movieID,
        userID,
      });
      if (response) {
        fetchRatings(movieID);
        fetchMovies();
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
        fetchMovies();
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
        fetchMovies();
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
        fetchMovies();
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
        loaderStatus,
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
