import axios from "axios";
import {
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAILURE,
  USER_SIGNOUT,
} from "./types";
import backendServer from "../backEndConfig";
import { LOGIN_QUERY } from "../Queries/queries";
import ApolloClientProvider from "./ApolloClientProvider";

export const userSignin = (signindata) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    const { client } = ApolloClientProvider;
    console.log("Sign In Action ===> signindata ", signindata);

    const res = client.query({
      query: LOGIN_QUERY,
      variables: signindata,
    });
    const response = await res;
    console.log("Sign In Action ===> Response ", response);
    const { data } = response;
    const { login } = data;
    const { errCode, user, token, status } = login;

    if ((errCode && errCode === 400) || errCode === 500) {
      throw new Error("SignIn Error");
    }
    console.log(" for user", user);
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: login,
    });
  } catch (err) {
    console.log("Sign In Error ", err.response);
    dispatch({
      type: USER_SIGNIN_FAILURE,
      payload: err,
    });
  }
};
// SignOut Action
export const userSignOut = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: USER_SIGNOUT });
};
