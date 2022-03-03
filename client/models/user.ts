export interface UserState {
  [auth: string] : AuthState;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string;
}