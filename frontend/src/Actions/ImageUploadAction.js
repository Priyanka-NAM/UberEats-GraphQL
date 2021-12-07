import axios from "axios";

import {
  OWNER_PROFILE_UPLOAD,
  OWNER_PROFILE_UPLOAD_FAILURE,
  CUSTOMER_PROFILE_UPLOAD,
  CUSTOMER_PROFILE_UPLOAD_FAILURE,
  DISH_IMAGE_UPLOAD,
  DISH_IMAGE_UPLOAD_FAILURE,
} from "./types";
import backendServer from "../backEndConfig";
import { getToken } from "../components/Service/authService";
import ApolloClientProvider from "./ApolloClientProvider";
// import {
//   OWNER_IMAGE_UPLOAD,
//   DISHES_IMAGE_UPLOAD,
//   CUSTOMER_IMAGE_UPLOAD,
// } from "../Queries/queries";

export const customerProfilePic = (data) => async (dispatch) => {
  try {
    const uploadConfig = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: getToken(),
      },
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["x-auth-token"] = getToken();
    const res = await axios.post(
      `${backendServer}/ubereats/fileUpload/profile_upload`,
      data,
      uploadConfig
    );
    const response = await res;

    dispatch({
      type: CUSTOMER_PROFILE_UPLOAD,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_PROFILE_UPLOAD_FAILURE,
      payload: err.response,
    });
  }
};

export const ownerProfilePic = (imagedata) => async (dispatch) => {
  console.log("image datra", imagedata);
  try {
    const uploadConfig = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: getToken(),
      },
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["x-auth-token"] = getToken();

    const res = await axios.post(
      `${backendServer}/ubereats/fileUpload/profile_upload`,
      imagedata,
      uploadConfig
    );
    const response = await res;
    // const { client } = ApolloClientProvider;
    // const res = client.query({
    //   query: OWNER_IMAGE_UPLOAD,
    //   variables: imagedata,
    // });
    // const response = await res;
    // const { data } = response;
    // const { getOrderStatus } = data;
    // const { errCode, orders, status } = getOrderStatus;
    dispatch({
      type: OWNER_PROFILE_UPLOAD,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: OWNER_PROFILE_UPLOAD_FAILURE,
      payload: err.response,
    });
  }
};

export const dishProfilePic = (data) => async (dispatch) => {
  try {
    const uploadConfig = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: getToken(),
      },
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["x-auth-token"] = getToken();
    const res = await axios.post(
      `${backendServer}/ubereats/fileUpload/profile_upload`,
      data,
      uploadConfig
    );
    const response = await res;

    dispatch({
      type: DISH_IMAGE_UPLOAD,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: DISH_IMAGE_UPLOAD_FAILURE,
      payload: err.response,
    });
  }
};
