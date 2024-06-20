import { ReactNode, createContext, useContext, useState } from 'react';
import { CommentaryType, ListMovieType, Movies } from '../types/common_types';
import axios, { AxiosError } from 'axios';
import { AuthContext } from './AuthContext';
import { toastError } from '../assets/utils/failedToast';
import { baseUrl } from '../assets/utils/baseUrl';

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
  removeMovieFromMyList: () => Promise<void>;
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
  const { setIsLoading } = useContext(AuthContext);
  const [movies, setMovies] = useState<null | Movies>(null);
  const [myMovieList, setMovieMyList] = useState<null | ListMovieType[]>(null);
  const [commentaries, setCommentaries] = useState<null | CommentaryType[]>(
    null
  );
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${baseUrl}/movies/all`);
      if (response) {
        console.log(response);

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
    console.log(userID);
    try {
      const response = await axios.get(
        `${baseUrl}/movies/mymovielist/${userID}`
      );
      console.log(response.data);
      if (response) {
        setMovieMyList(response.data);
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
    console.log(movieID, userID);

    try {
      const response = await axios.post(`${baseUrl}/movies/addtomylist`, {
        movieID,
        userID,
      });
      console.log(response.config.data.movieID);
    } catch (error) {}
  };

  const getCommentaries = async () => {
    try {
    } catch (error) {}
  };

  const addCommentary = async () => {
    try {
    } catch (error) {}
  };

  const removeMovieFromMyList = async () => {
    setIsLoading(true);
    try {
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
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
