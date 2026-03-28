import { create } from 'zustand';
import { authService } from '../services/authService';
import { TOKEN_KEY } from '../utils/constants';

const getInitialToken = () => window.localStorage.getItem(TOKEN_KEY);

const persistToken = (token) => {
  if (token) {
    window.localStorage.setItem(TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(TOKEN_KEY);
  }
};

export const useAuthStore = create((set, get) => ({
  token: getInitialToken(),
  user: null,
  status: 'idle',
  error: null,
  isAuthenticated: Boolean(getInitialToken()),
  consumeToken(token) {
    persistToken(token);
    set({ token, isAuthenticated: true, error: null });
  },
  async hydrate() {
    const token = get().token;

    if (!token) {
      set({ status: 'ready', isAuthenticated: false, user: null });
      return;
    }

    set({ status: 'loading', error: null });

    try {
      const { data } = await authService.getProfile();
      set({ user: data.user, status: 'ready', isAuthenticated: true });
    } catch (error) {
      persistToken(null);
      set({ token: null, user: null, status: 'ready', isAuthenticated: false, error: error.message });
    }
  },
  async login(payload) {
    set({ status: 'loading', error: null });

    try {
      const { data } = await authService.login(payload);
      persistToken(data.token);
      set({ token: data.token, user: data.user, status: 'ready', isAuthenticated: true });
      return data;
    } catch (error) {
      set({ status: 'ready', error: error.message });
      throw error;
    }
  },
  async register(payload) {
    set({ status: 'loading', error: null });

    try {
      const { data } = await authService.register(payload);
      persistToken(data.token);
      set({ token: data.token, user: data.user, status: 'ready', isAuthenticated: true });
      return data;
    } catch (error) {
      set({ status: 'ready', error: error.message });
      throw error;
    }
  },
  async logout() {
    await authService.logout().catch(() => null);
    persistToken(null);
    set({ token: null, user: null, status: 'ready', isAuthenticated: false, error: null });
  },
}));