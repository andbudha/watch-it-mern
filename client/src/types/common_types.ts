export type Movie = {
  _id: string;
  title: string;
  year: number;
  cast: string[];
  genres: string[];
  href: string;
  extract: string;
  thumbnail: string;
  thumbnail_width: number;
  thumbnail_height: number;
};

export type Movies = Movie[];

export type LoginValueTypes = {
  email: string;
  password: string;
};

export type LoginErrorType = {
  email: string;
  password: string;
};

export type SignupValueTypes = {
  email: string;
  password: string;
  nickName: string;
};
export type SignupErrorTypes = {
  email: string;
  password: string;
  nickName: string;
};

export type UserResponseType = {
  _id: string;
  email: string;
  password?: string;
  nickName: string;
  avatar?: string;
  movieList?: string[];
};

export type ListMovieType = {
  title: string;
  year: number;
  userID: string;
  thumbnail: string;
  id: string;
};

export type CommentaryType = {
  id: string;
  movieID: string;
  userID: string;
  avatar: string;
  nickName: string;
  timestamp: string;
  commentary: string;
};
