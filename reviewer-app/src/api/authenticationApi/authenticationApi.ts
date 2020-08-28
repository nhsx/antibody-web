export interface SignInResponse {
  user: any;
  successful: boolean;
  requiresNewPassword: boolean;
  errors?: string[];
}

export interface NewPasswordResponse {
  successful: boolean;
  errors?: string[];
}

export interface AuthenticationApi {
  signIn: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<SignInResponse>;

  newPassword: ({
    user,
    newPassword,
  }: {
    user: any;
    newPassword: string;
  }) => Promise<NewPasswordResponse>;

  signOut: Function;
}
