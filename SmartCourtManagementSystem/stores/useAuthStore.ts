import { create } from 'zustand';
import { User, WalletTransaction } from '../types';
import { CURRENT_USER } from '../constants/mockData';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  transactions: WalletTransaction[];
  login: (identifier: string, pass: string) => Promise<boolean>;
  quickLogin: (userType: 'trieu' | 'alex' | 'guest') => void;
  register: (name: string, email: string, phone: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profile: Partial<User>) => void;
  updateWallet: (amountDelta: number, description?: string, paymentMethod?: string) => void;
}

const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx_001',
    type: 'topup',
    amount: 1000000,
    description: 'Nạp tiền qua MoMo QR',
    timestamp: '17/10/2026 14:20',
    paymentMethod: 'MoMo',
    status: 'success',
  },
  {
    id: 'tx_002',
    type: 'payment',
    amount: -450000,
    description: 'Thanh toán đặt Sân 1 Thảo Điền (18:30 - 20:00)',
    timestamp: '17/10/2026 18:30',
    paymentMethod: 'Ví Infinity',
    status: 'success',
  },
  {
    id: 'tx_003',
    type: 'topup',
    amount: 1900000,
    description: 'Nạp tiền qua Cổng VNPAY',
    timestamp: '16/10/2026 09:15',
    paymentMethod: 'VNPAY',
    status: 'success',
  },
];

export const useAuthStore = create<AuthState>((set) => ({
  user: CURRENT_USER,
  token: 'mock_jwt_token_infinity_padel',
  isAuthenticated: true,
  transactions: INITIAL_TRANSACTIONS,

  login: async (identifier, pass) => {
    // Allows login with any valid identifier
    const loggedUser: User = {
      ...CURRENT_USER,
      email: identifier.includes('@') ? identifier : CURRENT_USER.email,
      phone: !identifier.includes('@') ? identifier : CURRENT_USER.phone,
    };
    set({
      user: loggedUser,
      token: `token_${Date.now()}`,
      isAuthenticated: true,
    });
    return true;
  },

  quickLogin: (userType) => {
    if (userType === 'trieu') {
      set({
        user: CURRENT_USER,
        token: 'token_trieu_verified',
        isAuthenticated: true,
      });
    } else if (userType === 'alex') {
      set({
        user: {
          id: 'usr_002',
          name: 'Alexandre Nguyễn',
          email: 'alex.nguyen@padel.vn',
          phone: '0912 888 777',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          vprRating: 4.10,
          levelTitle: 'Advanced Player',
          matchesPlayed: 34,
          winRate: 65,
          walletBalance: 850000,
        },
        token: 'token_alex_verified',
        isAuthenticated: true,
      });
    } else {
      set({
        user: {
          id: `usr_guest_${Date.now().toString().slice(-4)}`,
          name: 'Khách Chơi Mới (Guest)',
          email: 'guest@infinitypadel.vn',
          phone: '0901 000 000',
          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
          vprRating: 2.50,
          levelTitle: 'Casual Beginner',
          matchesPlayed: 2,
          winRate: 50,
          walletBalance: 0,
        },
        token: 'token_guest_verified',
        isAuthenticated: true,
      });
    }
  },

  register: async (name, email, phone) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: name.trim() || 'Người chơi mới',
      email: email.trim(),
      phone: phone.trim(),
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      vprRating: 3.0,
      levelTitle: 'Novice Member',
      matchesPlayed: 0,
      winRate: 0,
      walletBalance: 0,
    };
    set({
      user: newUser,
      token: `token_${Date.now()}`,
      isAuthenticated: true,
    });
    return true;
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  updateProfile: (profile) => {
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          ...profile,
        },
      };
    });
  },

  updateWallet: (amountDelta, description = 'Giao dịch ví', paymentMethod = 'Hệ thống') => {
    set((state) => {
      if (!state.user) return state;
      const newBalance = Math.max(0, state.user.walletBalance + amountDelta);
      const newTx: WalletTransaction = {
        id: `tx_${Date.now()}`,
        type: amountDelta >= 0 ? 'topup' : 'payment',
        amount: amountDelta,
        description,
        timestamp: new Date().toLocaleString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        paymentMethod,
        status: 'success',
      };
      return {
        user: {
          ...state.user,
          walletBalance: newBalance,
        },
        transactions: [newTx, ...state.transactions],
      };
    });
  },
}));
