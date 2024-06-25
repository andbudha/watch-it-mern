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

export type ListMovieType = {
  _id: string;
  title: string;
  year: number;
  thumbnail: string;
};

export type LoginCommonTypes = {
  email: string;
  password: string;
};

export type SignupCommonTypes = {
  email: string;
  password: string;
  nickName: string;
};

export type UpdateProfileCommonTypes = {
  email: string | undefined;
  nickName: string | undefined;
};

export type UserResponseType = {
  _id: string;
  email: string;
  password?: string;
  nickName: string;
  avatar?: string;
  movieList?: string[];
};

export type CommentaryType = {
  commentaryID: string;
  movieID: string;
  userID: string;
  avatar: string;
  nickName: string;
  timestamp: number;
  commentary: string;
};
