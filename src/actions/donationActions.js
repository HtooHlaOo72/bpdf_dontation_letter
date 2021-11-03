import { FETCH_ALL, ADD_DONATION, DELETE_DONATION,UPDATE_DONATION, SET_EDIT_DATA,SET_GEN_DATA, SORT_DONATIONS } from './types';

export const fetchDonations = (token) => dispatch => {
  fetch(process.env.REACT_APP_CRUD_URL,{
    headers: {
      'content-type': 'application/json',
      'Authorization':`Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(json =>{
      if(json.success){
        dispatch({
          type: FETCH_ALL,
          payload: json.data
        })
      }
      }
    ).catch((e)=>{console.log("error in fetching data")})
};

export const createDonation = (newDonation,token) => dispatch => {
  fetch(process.env.REACT_APP_CRUD_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization':`Bearer ${token}`
    },
    body: JSON.stringify(newDonation)
  })
  .then(res => res.json())
  .then(json =>{
    console.log("create donation...")
    dispatch({
      type: ADD_DONATION,
      payload: json.data
    })}
  )
  .catch(e=>{
    console.log(e)
  });
};

export const updateDonation=(newData,token)=>dispatch=>{
  //make update request
  fetch(`${process.env.REACT_APP_CRUD_URL}/${newData._id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'Authorization':`Bearer ${token}`
    },
    body: JSON.stringify(newData)
  })
    .then(res => res.json())
    .then(json =>
      dispatch({
        type: UPDATE_DONATION,
        payload: json.data
      })
    )
    .catch((e)=>{
      console.log("Error in updating...")
    })

}
export const deleteDonation = (_id,token) => dispatch => {
  console.log(_id,token);
  fetch(`${process.env.REACT_APP_CRUD_URL}/${_id}`,{
    method:"DELETE",
    headers: {
      'content-type': 'application/json',
      'Authorization':`Bearer ${token}`
    }
  })
  .then(resp=>resp.json())
    .then(json =>{
      // console.log(_id,'delete',json.data._id);
      dispatch({
        type: DELETE_DONATION,
        payload: json.data._id
      })
    }
    ).catch((e)=>{
      console.log("Error in deletion...",e)
    })
};

export const setEditData=(donation)=>dispatch=>{
  dispatch({
    type:SET_EDIT_DATA,
    payload:donation
  })
}

export const setGenerateData=(donation)=>dispatch=>{
  dispatch({
    type:SET_GEN_DATA,
    payload:donation
  })
}

export const sortDonations=()=>dispatch=>{
  dispatch({
    type:SORT_DONATIONS,
    payload:""
  })
}