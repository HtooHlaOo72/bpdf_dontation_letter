import { FETCH_SUPPLIES,UPDATE_SUPPLY, DELETE_SUPPLY , ADD_SUPPLY,SET_EDIT_SUPPLY,SET_GEN_SUPPLY} from "../actions/types";

  
  export const fetchSupplies = (token) => (dispatch) => {
    console.log('Fecth supplies',token);
    fetch(`${process.env.REACT_APP_API_URL}/supplies`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          dispatch({
            type: FETCH_SUPPLIES,
            payload: json.data,
          });
        }
      })
      .catch((e) => {
        console.log("error in fetching supply data");
      });
  };
  
  export const createSupply = (newSupply, token) => (dispatch) => {
    console.log(JSON.stringify(newSupply),'create supply');
    fetch(`${process.env.REACT_APP_API_URL}/supplies`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newSupply),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("create donation...");
        dispatch({
          type: ADD_SUPPLY,
          payload: json.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  export const updateSupply = (newSupply, token) => (dispatch) => {
    //make update request
    console.log(newSupply,'update action');
    fetch(`${process.env.REACT_APP_API_URL}/supplies/${newSupply._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newSupply),
    })
      .then((res) => res.json())
      .then((json) =>
        dispatch({
          type: UPDATE_SUPPLY,
          payload: json.data,
        })
      )
      .catch((e) => {
        console.log("Error in updating supply!");
      });
  };
  export const deleteSupply = (_id, token) => (dispatch) => {
    fetch(`${process.env.REACT_APP_API_URL}/supplies/${_id}`, {
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
          type: DELETE_SUPPLY,
          payload: json.data._id,
        });
      })
      .catch((e) => {
        console.log("Error in deleting suppply!", e);
      });
  };
  
  export const setEditSupply = (id) => (dispatch) => {
    dispatch({
      type: SET_EDIT_SUPPLY,
      payload: id,
    });
  };
  
  export const setGenerateSupply = (id) => (dispatch) => {
    dispatch({
      type: SET_GEN_SUPPLY,
      payload: id,
    });
  };