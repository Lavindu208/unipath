export interface User {
  id: number;
  name: string;
  email: string;
  zScore?: number | string | null;
  district?: string | null;
  stream?: string | null;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  zScore?: number | null;
  district?: string;
  stream?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}
