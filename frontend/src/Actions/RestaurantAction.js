import axios from "axios";
import { ALL_RESTAURANTS, ALL_RESTAURANTS_FAILURE } from "./types";
import backendServer from "../backEndConfig";
import { getToken } from "../components/Service/authService";
import ApolloClientProvider from "./ApolloClientProvider";
import { GET_ALL_RESTAURANTS_QUERY } from "../Queries/queries";

export const restaurants = () => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["x-auth-token"] = getToken();
    const { client } = ApolloClientProvider;
    const res = client.query({
      query: GET_ALL_RESTAURANTS_QUERY,
    });

    const response = await res;
    console.log("Respose from gaphql quey", response);
    const { data } = response;
    const { getRestaurants } = data;
    const { errCode, allRestaurants, status } = getRestaurants;
    console.log("All Restaurants ", allRestaurants);
    if ((errCode && errCode === 400) || errCode === 500) {
      throw new Error("SignIn Error");
    }
    dispatch({
      type: ALL_RESTAURANTS,
      payload: response.data.getRestaurants,
    });
  } catch (err) {
    dispatch({
      type: ALL_RESTAURANTS_FAILURE,
      payload: err.response,
    });
  }
};

export const searchRestaurants = (searchInput) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    // axios.defaults.headers.common.authorization = getToken();
    axios.defaults.headers.common["x-auth-token"] = getToken();
    const res = await axios.get(
      `${backendServer}/ubereats/customerrestaurant/restaurantsearch/${searchInput}`
    );
    const response = await res;

    dispatch({
      type: ALL_RESTAURANTS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: ALL_RESTAURANTS_FAILURE,
      payload: err.response,
    });
  }
};
