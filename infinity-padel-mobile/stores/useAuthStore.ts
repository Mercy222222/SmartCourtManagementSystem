import { create } from 'zustand';
import { User } from '../types';
import { CURRENT_USER } from '../constants/mockData';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateWallet: (amountDelta: number) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: CURRENT_USER,
  token: 'mock_jwt_token_infinity_padel',
  isAuthenticated: true,

  login: async (email, pass) => {
    // In production, calls /api/auth/login
    set({ user: CURRENT_USER, token: 'mock_jwt_token', isAuthenticated: true });
    return true;
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
  },

  updateWallet: (amountDelta) => {
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          walletBalance: state.user.walletBalance + amountDelta
        }
      };
    });
  }
}));
