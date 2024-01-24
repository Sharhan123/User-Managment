export const LoginSuccess = (token) => ({
    type: 'LOGIN_SUCCESS',
    payload: token,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });

  export const updateToken = (token) => ({
    type: 'UPDATE_TOKEN',
    payload: token,
  });