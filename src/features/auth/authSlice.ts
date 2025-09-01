import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { User, UserRole } from "../../types";
import { saveToStorage, loadFromStorage } from "../../utils/localStorage";

interface AuthState {
  currentUser: User | null;
  users: User[];
  isAuthenticated: boolean;
}

const USERS_STORAGE_KEY = "users";
const SESSION_STORAGE_KEY = "session";

const initialState: AuthState = {
  currentUser: null,
  users: [],
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadStateFromLocalStorage(state) {
      const storedUsers = loadFromStorage<User[]>(USERS_STORAGE_KEY);
      const sessionUser = loadFromStorage<User>(SESSION_STORAGE_KEY);
      state.users = storedUsers || [];
      state.currentUser = sessionUser || null;
      state.isAuthenticated = !!sessionUser;
    },
    signUp(state, action: PayloadAction<Omit<User, "id">>) {
      const existingUser = state.users.find(
        (u) => u.email === action.payload.email
      );
      if (existingUser) {
        throw new Error("User with this email already exists.");
      }
      const newUser: User = { ...action.payload, id: uuidv4() };
      state.users.push(newUser);
      saveToStorage(USERS_STORAGE_KEY, state.users);
    },
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      const user = state.users.find(
        (u) =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );
      if (user) {
        const { password, ...userToStore } = user;
        state.currentUser = userToStore as User;
        state.isAuthenticated = true;
        saveToStorage(SESSION_STORAGE_KEY, userToStore);
      } else {
        throw new Error("Invalid email or password.");
      }
    },
    logout(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem(SESSION_STORAGE_KEY);
    },
    updateUserProfile(
      state,
      action: PayloadAction<{ userId: string; profileData: any }>
    ) {
      const userIndex = state.users.findIndex(
        (u) => u.id === action.payload.userId
      );
      if (userIndex !== -1) {
        state.users[userIndex].profile = {
          ...state.users[userIndex].profile,
          ...action.payload.profileData,
        };
        if (state.currentUser?.id === action.payload.userId) {
          state.currentUser.profile = state.users[userIndex].profile;
          saveToStorage(SESSION_STORAGE_KEY, state.currentUser);
        }
        saveToStorage(USERS_STORAGE_KEY, state.users);
      }
    },
  },
});

export const {
  signUp,
  login,
  logout,
  loadStateFromLocalStorage,
  updateUserProfile,
} = authSlice.actions;
export default authSlice.reducer;
