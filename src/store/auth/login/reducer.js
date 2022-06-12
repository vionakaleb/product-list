import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  LOGIN_FAILED,
} from "./actionTypes";

const initialState = {
  errorMessage: "",
  loading: false,
  user: JSON.parse(localStorage.getItem("localUser"))?.user || {},
  token: "",
  tokenType: "",
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS: {
      const { user, token, tokenType, expiresIn } = action.payload;
      return {
        ...state,
        loading: false,
        user,
        token,
        tokenType,
        expiresIn,
        errorMessage: "",
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        errorMessage: action.payload.message,
        loading: false,
      };
    }
    case LOGOUT_USER:
      return {
        ...state,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
      };
    case API_ERROR:
      return {
        ...state,
        errorMessage: action.payload.message,
        loading: false,
      };
    default:
      return state;
  }
};

export default login;
