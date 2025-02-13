export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  academyId: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface SigninResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  academyId: string;
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  userId: string;
  email: string;
  roles: string[];
  academyId: string;
  studentId?: string;
  accessToken: string;
  refreshToken: string;
}

export interface Credential {
  email: string;
  password: string;
  academyId: string;
}
