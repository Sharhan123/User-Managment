const initialState = {
    token: localStorage.getItem('token') || null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          token: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          token: null,
        };
        case 'UPDATE_TOKEN':
          return {
            ...state,
            token: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default authReducer;