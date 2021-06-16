export type UserInfo = {
  name: string;
  email: string;
};

export type WithTokens = {
  accessToken: string;
  refreshToken: string;
};

export type ServerResponse = {
  success: boolean;
  message?: string;
};

export type RegisterUserData = UserInfo & {
  password: string;
};

export type RegisterUserResponse = ServerResponse &
  WithTokens & {
    user: UserInfo;
  };

export type LoginUserData = {
  email: string;
  password: string;
};

export type LoginUserResponse = RegisterUserResponse;

export type UpdateUserResponse = ServerResponse & {
  user: UserInfo;
};

export type UpdateTokenResponse = ServerResponse & WithTokens;
