import { ReactNode, createContext, useContext, useState } from 'react';
import { CommentaryType, ListMovieType, Movies } from '../types/common_types';
import axios, { AxiosError } from 'axios';
import { AuthContext } from './AuthContext';
import { toastError } from '../assets/utils/failedToast';
import { baseUrl } from '../assets/utils/baseUrl';
import { successfulToast } from '../assets/utils/successfulToast';

type DataContextType = {
  searchInputValue: string;
  setSearchInputValue: (newSearchInoutValue: string) => void;
  getUsers: () => Promise<void>;
  movies: Movies | null;
  myMovieList: ListMovieType[] | null;
  commentaries: CommentaryType[] | null;
  fetchMovies: () => Promise<void>;
  fetchMyMovieList: (userID: string) => Promise<void>;
  addMovieToMyList: (movieID: string, userID: string) => Promise<void>;
  removeMovieFromMyList: (movieID: string, userID: string) => Promise<void>;
  addCommentary: (movieID: string, textAreaValue: string) => Promise<void>;
  getCommentaries: () => Promise<void>;
};

type DataProviderProps = { children: ReactNode };

const initialDataContextState = {
  searchInputValue: '',
  setSearchInputValue: (newSearchInoutValue: string) => newSearchInoutValue,
  getUsers: () => Promise.resolve(),
  movies: [] as Movies,
  myMovieList: [] as ListMovieType[],
  commentaries: [] as CommentaryType[],
  fetchMovies: () => Promise.resolve(),
  fetchMyMovieList: () => Promise.resolve(),
  addMovieToMyList: () => Promise.resolve(),
  removeMovieFromMyList: () => Promise.resolve(),
  addCommentary: () => Promise.resolve(),
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
  const getUsers = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const addMovieToMyList = async (movieID: string, userID: string) => {
    try {
      const response = await axios.post(`${baseUrl}/movies/addtomylist`, {
        movieID,
        userID,
      });
      if (response.data.message) {
        fetchMyMovieList(user!._id);
        successfulToast(response.data.message);
      }
      console.log(response);
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
        fetchMyMovieList(user!._id);
        successfulToast(response.data.message);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const getCommentaries = async () => {
    try {
    } catch (error) {}
  };

  const addCommentary = async () => {
    try {
    } catch (error) {}
  };

  return (
    <DataContext.Provider
      value={{
        searchInputValue,
        setSearchInputValue,
        getUsers,
        fetchMovies,
        fetchMyMovieList,
        movies,
        addMovieToMyList,
        removeMovieFromMyList,
        addCommentary,
        commentaries,
        getCommentaries,
        myMovieList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
