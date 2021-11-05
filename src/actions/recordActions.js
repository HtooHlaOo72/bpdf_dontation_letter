import { DELETE_RECORDS, FETCH_RECORDS } from "./types";

export const fetchRecords=(token)=>dispatch=>{
    fetch(process.env.REACT_APP_RECORD_URL, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.success) {
        dispatch({
          type: FETCH_RECORDS,
          payload: json.data,
        });
      }
    })
    .catch((e) => {
      console.log("error in fetching records");
    });
}


export const deleteRecords = (token) => (dispatch) => {
    console.log('delete records..')
    fetch(`${process.env.REACT_APP_RECORD_URL}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((json) => {
        // console.log(_id,'delete',json.data._id);
        dispatch({
          type: DELETE_RECORDS,
          payload: json.data._id,
        });
      })
      .catch((e) => {
        console.log("Error in deleting records...", e);
      });
  };
