export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  targetRole?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
