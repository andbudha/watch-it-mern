import { ReactNode, createContext, useContext, useState } from 'react';
import { CommentaryType, Movies } from '../types/common_types';
import axios, { AxiosError, ResponseType } from 'axios';
import { AuthContext } from './AuthContext';
import { toastError } from '../assets/utils/failedToast';

type MovieToAddType = {
  title?: string;
  year?: number;
  userID?: string;
  thumbnail?: string;
  id?: string;
};
type DataContextType = {
  searchInputValue: string;
  setSearchInputValue: (newSearchInoutValue: string) => void;
  usersCollection: CollectionUser[] | null;
  getUsers: () => Promise<void>;
  movies: Movies | null;
  commentaries: CommentaryType[] | null;
  fetchMovies: () => Promise<void>;
  addMovieToMyList: (newMovie: MovieToAddType) => Promise<void>;
  removeMovieFromMyList: (movie: MovieToAddType) => Promise<void>;
  addCommentary: (movieID: string, textAreaValue: string) => Promise<void>;
  getCommentaries: () => Promise<void>;
};
type CollectionUser = {
  email: string;
  id: string;
  movieList: MovieToAddType[];
};
type DataProviderProps = { children: ReactNode };

const initialDataContextState = {
  searchInputValue: '',
  setSearchInputValue: (newSearchInoutValue: string) => newSearchInoutValue,
  usersCollection: [] as CollectionUser[],
  getUsers: () => Promise.resolve(),
  movies: [] as Movies,
  commentaries: [] as CommentaryType[],
  fetchMovies: () => Promise.resolve(),
  addMovieToMyList: () => Promise.resolve(),
  removeMovieFromMyList: () => Promise.resolve(),
  addCommentary: () => Promise.resolve(),
  getCommentaries: () => Promise.resolve(),
} as DataContextType;

export const DataContext = createContext(initialDataContextState);

export const DataProvider = ({ children }: DataProviderProps) => {
  const { setIsLoading } = useContext(AuthContext);
  const [movies, setMovies] = useState<null | Movies>(null);
  const [usersCollection, setUsersCollection] = useState<
    CollectionUser[] | null
  >(null);
  const [commentaries, setCommentaries] = useState<null | CommentaryType[]>(
    null
  );
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/movieit/movies/all'
      );
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

  const getUsers = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const addMovieToMyList = async () => {
    try {
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
        usersCollection,
        getUsers,
        fetchMovies,
        movies,
        addMovieToMyList,
        removeMovieFromMyList,
        addCommentary,
        commentaries,
        getCommentaries,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
