import { CHANGE_SUCCESS, LOGIN } from "./types";
import axios from "axios";
export const loginUser = (username, password) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}/users/login`, {
      username,
      password,
    })
    .then((auth) => {
      dispatch({
        type: LOGIN,
        payload: auth.data,
      });
    })
    .catch((e) => {
      dispatch({
        type: LOGIN,
        payload: {
          success: false,
          error: "Invalid Password Or Username",
        },
      });
    });
};

export const changePassword =
  (username, password, newPassword, token) => async (dispatch) => {
    console.log(username, password, newPassword, token, "ChangePw");
    const resp=await axios.put(
        `${process.env.REACT_APP_API_URL}/users/changepassword`,
        { username, password, newPassword },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    console.log(JSON.stringify(resp));
    dispatch({
        type:CHANGE_SUCCESS,
        payload:{
            changeResponse:resp.data.success?"Password changed successfully":"Invalid Password Or Unknown Error!"
        }
    });
};
   
