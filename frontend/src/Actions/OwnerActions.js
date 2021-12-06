/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import axios from "axios";
import {
  OWNER_SIGNUP,
  OWNER_SIGNUP_FAILURE,
  OWNER_UPDATE,
  OWNER_UPDATE_FAILURE,
  OWNER_NEW_ORDER,
  OWNER_NEW_ORDER_FAILURE,
  OWNER_ORDER_UPDATE,
  OWNER_ORDER_UPDATE_FAILURE,
  OWNER_DELIVERED_ORDER,
  OWNER_DELIVERED_ORDER_FAILURE,
  OWNER_CANCELLED_ORDER,
  OWNER_CANCELLED_ORDER_FAILURE,
  OWNER_MENU,
  OWNER_MENU_FETCH_FAILURE,
  OWNER_MENU_UPDATE,
  OWNER_MENU_UPDATE_FAILURE,
  OWNER_MENU_ADD,
  OWNER_MENU_ADD_FAILURE,
  CUSTOMER_DETAILS,
  CUSTOMER_DETAILS_FETCH_FAILURE,
  OWNER_PROFILE_DETAILS,
  OWNER_PROFILE_DETAILS_FAILURE,
} from "./types";
import backendServer from "../backEndConfig";
import { getToken } from "../components/Service/authService";
import {
  SIGN_UP_OWNER,
  UPDATE_OWNER,
  ALL_DISHES_LIST,
  GET_OWNER_DETAILS,
  ADD_DISH,
  UPDATE_DISH,
  GET_NEW_ORDERS,
  GET_COMPLETED_ORDERS,
  NEW_ORDERS_UPDATE,
} from "../Queries/queries";
import ApolloClientProvider from "./ApolloClientProvider";

export const addOwner = (signupdata) => async (dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    const { client } = ApolloClientProvider;
    const res = client.query({
      query: SIGN_UP_OWNER,
      variables: signupdata,
    });
    // console.log("Sign UP data ", signupdata);
    const response = await res;

    // console.log("Sign UP  ", response.data.signUpOwner);
    // console.log("Sign UP token ", response.data.signUpOwner.token);
    localStorage.setItem("jwtToken", response.data.signUpOwner.token);
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.signUpOwner.user)
    );

    const { data } = response;
    const { signUpOwner } = data;
    const { errCode, user, status } = signUpOwner;
    if ((errCode && errCode === 400) || errCode === 500) {
      throw new Error("Sign Up Error");
    }
    dispatch({
      type: OWNER_SIGNUP,
      payload: response.data.signUpOwner,
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: OWNER_SIGNUP_FAILURE,
      payload: err.response,
    });
  }
};

export const updateOwner = (ownerUpdateData) => async (dispatch) => {
  console.log("ownerUpdateData  ", ownerUpdateData);
  try {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["x-auth-token"] = getToken();
    const { client } = ApolloClientProvider;
    const res = client.query({
      query: UPDATE_OWNER,
      variables: ownerUpdateData,
    });

    const response = await res;
    const { data } = response;
    const { profileOwner } = data;
    const { errCode, user, status } = profileOwner;
    if ((errCode && errCode === 400) || errCode === 500) {
      throw new Error("Sign Up Error");
    }
    dispatch({
      type: OWNER_UPDATE,
      payload: response.data.profileOwner,
    });
  } catch (err) {
    dispatch({
      type: OWNER_UPDATE_FAILURE,
      payload: err.response,
    });
  }
};

export const ownerNewOrders = () => async (dispatch) => {
  const { restaurant_id } = JSON.parse(localStorage.getItem("user"));
  if (!restaurant_id) return;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["x-auth-token"] = getToken();
  try {
    const { client } = ApolloClientProvider;
    const res = client.query({
      query: GET_NEW_ORDERS,
      variables: { restaurant_id },
    });
    // console.log("Sign UP data ", signupdata);
    const response = await res;
    const { data } = response;
    const { getNewOrders } = data;
    const { errCode, orders, status } = getNewOrders;
    console.log(" allDishes after dish added: ", response.data.getNewOrders);
    if ((errCode && errCode === 400) || errCode === 500) {
      throw new Error("Sign Up Error");
    }
    dispatch({
      type: OWNER_NEW_ORDER,
      payload: response.data.getNewOrders.orders,
    });
  } catch (error) {
    dispatch({
      type: OWNER_NEW_ORDER_FAILURE,
      payload: error,
    });
  }
};


export const ownerNewOrdersUpdate =
  (updateOrderDetails) => async (dispatch) => {
    const { restaurant_id } = JSON.parse(localStorage.getItem("user"));

    if (!restaurant_id) return;
    axios.defaults.withCredentials = true;

    try {
      const { client } = ApolloClientProvider;
      const res = client.query({
        query: NEW_ORDERS_UPDATE,
        variables: updateOrderDetails,
      });
      const response = await res;
      const { data } = response;
      const { ordersNewOrderUpdate } = data;
      const { errCode } = ordersNewOrderUpdate;
      console.log(
        " allDishes after dish added: ",
        response.data.ordersNewOrderUpdate
      );
      if ((errCode && errCode === 400) || errCode === 500) {
        throw new Error("Sign Up Error");
      }
      dispatch({
        type: OWNER_ORDER_UPDATE,
        payload: response.data.ordersNewOrderUpdate.orders,
      });
    } catch (error) {
      dispatch({
        type: OWNER_ORDER_UPDATE_FAILURE,
        payload: error,
      });
    }
  };

export const ownerDeliveredOrders = () => async (dispatch) => {
  const { restaurant_id } = JSON.parse(localStorage.getItem("user"));
  if (!restaurant_id) return;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["x-auth-token"] = getToken();
  try {
    const { client } = ApolloClientProvider;
    const res = client.query({
      query: GET_COMPLETED_ORDERS,
      variables: { restaurant_id },
    });
    // console.log("Sign UP data ", signupdata);
    const response = await res;
    const { data } = response;
    const { getCompletedOrders } = data;
    const { errCode, orders, status } = getCompletedOrders;
    console.log(
      " allDishes after dish added: ",
      response.data.getCompletedOrders
    );
    if ((errCode && errCode === 400) || errCode === 500) {
      throw new Error("Sign Up Error");
    }
    dispatch({
      type: OWNER_DELIVERED_ORDER,
      payload: response.data.getCompletedOrders.orders,
    });
  } catch (error) {
    dispatch({
      type: OWNER_DELIVERED_ORDER_FAILURE,
      payload: error,
    });
  }
};

export const ownerCancelledOrders = () => async (dispatch) => {
  const { restaurant_id: restaurantId } = JSON.parse(
    localStorage.getItem("user")
  );

  console.log(" restaurantId: ", restaurantId);
  if (!restaurantId) return;
  axios.defaults.headers.common["x-auth-token"] = getToken();

  axios
    .get(
      `${backendServer}/ubereats/orders/cancelledorders/restaurant/${restaurantId}`
    )
    .then((response) => {
      console.log("Response: ", JSON.stringify(response.data));
      if (response.data.status === "CANCELLED_ORDERS") {
        dispatch({
          type: OWNER_CANCELLED_ORDER,
          payload: response.data.orders,
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: OWNER_CANCELLED_ORDER_FAILURE,
          payload: error.response,
        });
      }
    });
};

export const ownerMenu = () => async (dispatch) => {
  const { restaurant_id } = JSON.parse(localStorage.getItem("user"));
  if (!restaurant_id) return;
  axios.defaults.headers.common["x-auth-token"] = getToken();
  try {
    const { client } = ApolloClientProvider;
    const res = client.query({
      query: ALL_DISHES_LIST,
      variables: { restaurant_id },
    });
    const response = await res;
    const { data } = response;
    const { getAllDishes } = data;
    const { errCode, user, status } = getAllDishes;
    if ((errCode && errCode === 400) || errCode === 500) {
      throw new Error("Sign Up Error");
    }
    // console.log("Response: ", response.data.getAllDishes.allDishes);

    dispatch({
      type: OWNER_MENU,
      payload: response.data.getAllDishes.allDishes,
    });
  } catch (error) {
    dispatch({
      type: OWNER_MENU_FETCH_FAILURE,
      payload: error,
    });
  }
};

export const ownerMenuUpdate = (dishdata) => async (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["x-auth-token"] = getToken();
  console.log("Inside Owner Menu Update", dishdata);
  dishdata.price = String(dishdata.price);
  try {
    const { client } = ApolloClientProvider;
    const res = client.query({
      query: UPDATE_DISH,
      variables: dishdata,
    });
    // console.log("Sign UP data ", signupdata);
    const response = await res;
    const { data } = response;
    const { dishesUpdateDish } = data;
    const { errCode, allDishes, status } = dishesUpdateDish;
    console.log(
      " allDishes after dish update: ",
      response.data.dishesUpdateDish
    );

    if ((errCode && errCode === 400) || errCode === 500) {
      throw new Error("Sign Up Error");
    }

    dispatch({
      type: OWNER_MENU_UPDATE,
      payload: response.data.dishesUpdateDish.allDishes,
    });
  } catch (error) {
    console.log("Error in update ", error);
    dispatch({
      type: OWNER_MENU_UPDATE_FAILURE,
      payload: error.response,
    });
  }
};

export const ownerMenuAdd = (dishdata) => async (dispatch) => {
  try {
    console.log(" dishdata before dish added: ", dishdata);
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["x-auth-token"] = getToken();
    const { client } = ApolloClientProvider;
    const res = client.query({
      query: ADD_DISH,
      variables: dishdata,
    });
    // console.log("Sign UP data ", signupdata);
    const response = await res;
    const { data } = response;
    const { dishesAddDish } = data;
    const { errCode, allDishes, status } = dishesAddDish;
    console.log(" allDishes after dish added: ", response.data.dishesAddDish);

    if ((errCode && errCode === 400) || errCode === 500) {
      throw new Error("Sign Up Error");
    }

    // if (response.data.dishesAddDish.status === "DISH_ADDED") {
    dispatch({
      type: OWNER_MENU_ADD,
      payload: response.data.dishesAddDish.allDishes,
    });
    // } else {
    //   dispatch({
    //     type: OWNER_MENU_ADD_FAILURE,
    //     payload: response.data,
    //   });
    // }
  } catch (error) {
    // console.log("*********************", JSON.stringify(error));
    // console.log("*********************", JSON.stringify(error.response));
    dispatch({
      type: OWNER_MENU_ADD_FAILURE,
      payload: error.response,
    });
  }
};

export const getUserDetails = (customerId) => async (dispatch) => {
  if (!customerId) return;
  axios.defaults.headers.common["x-auth-token"] = getToken();

  axios
    .get(`${backendServer}/ubereats/owner/customerdetails/${customerId}`)
    .then((response) => {
      console.log("Response: ", JSON.stringify(response.data));

      if (response.data.status === "CUSTOMER_DETAILS") {
        dispatch({
          type: CUSTOMER_DETAILS,
          payload: response.data.customerDetails,
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: CUSTOMER_DETAILS_FETCH_FAILURE,
          payload: error.response,
        });
      }
    });
};

export const getOwnerProfile = () => async (dispatch) => {
  const { restaurant_id } = JSON.parse(localStorage.getItem("user"));
  if (!restaurant_id) return;
  try {
    axios.defaults.headers.common["x-auth-token"] = getToken();

    const { client } = ApolloClientProvider;
    const res = client.query({
      query: GET_OWNER_DETAILS,
      variables: { restaurant_id },
    });

    const response = await res;
    const { data } = response;
    const { getOwnerRestaurantDetails } = data;
    const { errCode, user, status } = getOwnerRestaurantDetails;
    if ((errCode && errCode === 400) || errCode === 500) {
      throw new Error("Sign Up Error");
    }

    dispatch({
      type: OWNER_PROFILE_DETAILS,
      payload: response.data.getOwnerRestaurantDetails,
    });
  } catch (error) {
    dispatch({
      type: OWNER_PROFILE_DETAILS_FAILURE,
      payload: error,
    });
  }
};
