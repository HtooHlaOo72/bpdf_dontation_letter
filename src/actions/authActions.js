import { LOGIN } from "./types";
import axios from "axios";
export const loginUser = (username, password) => (dispatch) => {
  axios
    .post("http://localhost:5000/users/login", { username, password })
    .then((auth) => {
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
