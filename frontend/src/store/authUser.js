import axios from 'axios';
import { create } from 'zustand';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    user: null,
    isSigninUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,
    signup: async (credentials) => {
        set({isSigninUp: true})
        try {
            const response = await axios.post('/api/version1/auth/signup', credentials);
            set({user: response.data.user, isSigninUp: false});
            toast.success("Signup successfull");
        } catch (error) {
            toast.error(error.response.data.message || "Sign in failed");
            set({isSigninUp: false, user: null});
        }
    },
    login: async (credentials) => {
        set({isLoggingIn: true});
        try {
            const response = await axios.post('/api/version1/auth/login', credentials);
            set({user: response.data.user, isLoggingIn: false});
            toast.success("Login successfull");
        } catch (error) {
            toast.error(error.response.data.message || "Login failed");
            set({isLoggingIn: false, user: null});
        }
    },
    logout: async () => {
        set({isLoggingOut: true});
        try {
            await axios.post('/api/version1/auth/logout');
            set({user: null, isLoggingOut: false});
            toast.success("Log out successfully");
        } catch (error) {
            set({isLoggingOut: false});
            toast.error(error.response.data.message || "Log out failed");
        }
    },
    authCheck: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get('/api/version1/auth/authCheck');
            set({user: response.data.user, isCheckingAuth: false});
        } catch (error) {
            set({isCheckingAuth: false, user: null});
        }
    },
}))