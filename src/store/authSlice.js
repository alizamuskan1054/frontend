import { createSlice } from "@reduxjs/toolkit";

/*
======================================================
Authentication Slice

Purpose:
- Manages authentication state globally.
- Stores logged-in user information and token.
- Handles login loading and error states.
- Provides actions for login, logout, and
  updating user data.

State Properties:
- user: Logged-in user's information.
- token: Authentication token (JWT).
- isAuthenticated: Indicates whether user is logged in.
- loading: Tracks authentication requests.
- error: Stores authentication errors.
======================================================
*/

// Initial authentication state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    /*
    ======================================================
    Starts login process
    - Enables loading state
    - Clears previous errors
    ======================================================
    */
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    /*
    ======================================================
    Login successful
    - Stores user information
    - Stores authentication token
    - Marks user as authenticated
    - Disables loading state
    ======================================================
    */
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    /*
    ======================================================
    Login failed
    - Stops loading state
    - Stores error message
    ======================================================
    */
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /*
    ======================================================
    Updates logged-in user's information
    Example:
    - Profile image
    - Full name
    - Settings
    ======================================================
    */
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },

    /*
    ======================================================
    Logs out the user
    - Resets authentication state to initial values
    ======================================================
    */
    logout: () => initialState,
  },
});

// Export authentication actions
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  updateUser,
  logout,
} = authSlice.actions;

// Export reducer to be added in Redux store
export default authSlice.reducer;