import { FETCH_ALL, ADD_DONATION, DELETE_DONATION,UPDATE_DONATION, SET_EDIT_DATA } from './types';

export const fetchDonations = (token) => dispatch => {
  fetch('http://localhost:3000/donations',{
    headers: {
      'content-type': 'application/json',
      'Authorization':`Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(donations =>
      dispatch({
        type: FETCH_ALL,
        payload: donations
      })
    );
};

export const createDonation = (newDonation,token) => dispatch => {
  fetch('http://localhost:3000/donations', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization':`Bearer ${token}`
    },
    body: JSON.stringify(newDonation)
  })
  .then(res => res.json())
  .then(donation =>{
    console.log("create donation...")
    dispatch({
      type: ADD_DONATION,
      payload: donation
    })}
  )
  .catch(e=>{
    console.log(e)
  });
};

export const updateDonation=(newData,token)=>dispatch=>{
  //make update request
  fetch(`http://localhost:3000/donations/${newData._id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'Authorization':`Bearer ${token}`
    },
    body: JSON.stringify(newData)
  })
    .then(res => res.json())
    .then(donation =>
      dispatch({
        type: UPDATE_DONATION,
        payload: donation
      })
    );
}
export const deleteDonation = (_id,token) => dispatch => {
  console.log(_id,token);
  fetch(`http://localhost:3000/donations/${_id}`,{
    method:"DELETE",
    headers: {
      'content-type': 'application/json',
      'Authorization':`Bearer ${token}`
    }
  })
  .then(resp=>resp.json())
    .then(data =>{
      console.log(_id,'delete',data._id);
      dispatch({
        type: DELETE_DONATION,
        payload: data._id
      })
    }
    )
};

export const setEditData=(donation)=>dispatch=>{
  dispatch({
    type:SET_EDIT_DATA,
    payload:donation
  })
}