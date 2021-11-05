import { LOGIN } from "./types";
import axios from "axios";
export const loginUser = (username, password) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_LOGIN_URL, { username, password })
    .then((auth) => {
        console.log(auth.data.role);
      dispatch({
          type:LOGIN,
          payload:auth.data
      });
    }
    )
    .catch((e) => {
      
        dispatch({
            type:LOGIN,
            payload:{
                success:false,
                error:"Invalid Password Or Username"
            }
        });
    });
};
