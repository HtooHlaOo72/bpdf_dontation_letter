import { LOGIN, LOGOUT } from "./types";
import axios from "axios";
export const loginUser = (username, password) => (dispatch) => {
  axios
    .post("http://localhost:3000/users/login", { username, password })
    .then((auth) => {
        console.log('ok')
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
