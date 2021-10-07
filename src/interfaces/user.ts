export interface UserState {
  authLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  isCheckingUser: boolean;
  viewedOnboarding: boolean;
  error: string | any | null;
  message: string | null;
  fetchingUser: boolean;
}

export type AuthLoginInput = {
  email: string;
  password: string;
};

export type AuthRegisterInput = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export interface User {
  id: number;
  account_id: number;
  firstname: string;
  lastname: string;
  email: string;
  email_verified_at: string;
  email_token: null;
  phone: string;
  address: string;
  city: string;
  state_id: number;
  country_id: number;
  enabled: boolean;
  deleted_at: null;
  token: string;
}

export interface AuthToken {
  userId?: number;
  authToken?: string;
  savedOn?: Date;
}
