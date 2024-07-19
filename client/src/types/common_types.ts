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
  commentaries?: CommentaryType;
  likes?: string[];
  dislikes?: string[];
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
  userID?: string;
  avatar?: File | null | string;
  avatarPublicID?: string;
  email: string | undefined;
  nickName: string | undefined;
};

export type LoggedinUserResponseTypes = {
  avatar: string;
  avatarPublicID: string;
  email: string;
  nickName: string;
  userID: string;
};
export type UserIdAndAvatarType = {
  _id: string;
  avatar: string;
  nickName: string;
};

export type CommentaryType = {
  commentaryID: string;
  movieID: string;
  userID: string;
  commentary: string;
  createdAt?: number;
  updatedAt?: number;
};
export type LoaderStateType =
  | 'idle'
  | 'loading'
  | 'addingMovie'
  | 'removingMovie'
  | 'addingPost'
  | 'postNewStatus';

export type AuthLoaderStatusType =
  | 'loggingin'
  | 'registering'
  | 'loggingout'
  | 'authorized'
  | 'updatingProfile';
