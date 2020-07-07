import { createActions } from 'redux-actions';

export const { auth } = createActions({
  AUTH: {
    LOGIN: (email, password) => ({ email, password }),

    SIGNUP: () => ({ }),
    
    LOGOUT: () => ({ }),
  }
})