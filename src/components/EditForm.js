import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import uuid from 'react-uuid';

import { useFormik } from "formik";

import { updateDonation } from "../actions/donationActions";
import { connect } from "react-redux";

const validate = (values) => {

  const errors = {};
  if (!values.donor) {
    errors.donor = "Required";
  } else if (values.donor.length > 50) {
    errors.donor = "Must be 50 characters or less";
  }

  if (!values.amount) {
    errors.amount = "Required";
  } else if (values.lastName < 1) {
    errors.amount = "Must be 1 or more";
  }

  if (!values.topic) {
    errors.topic = "Required";
  } else if (values.topic.length > 600) {
    errors.topic = "Must be less than 600 characters";
  }

  if (!values.signedBy) {
    errors.signedBy = "Required";
  } else if (values.signedBy.length > 50) {
    errors.signedBy = "Must be 50 characters or less";
  }

  return errors;
};

function EditForm(props) {

  const history=useHistory();
  //export component as image or pdf
  useEffect(()=>{
    if(!props.auth.isAuthenticated){
      history.push('/login');
    }

  },[]);
  const formik = useFormik({
    initialValues: {
      donor: props.donation.donor,
      amount: props.donation.amount,
      topic: props.donation.topic,
      signedBy: props.donation.signedBy,
    },
    validate,
    onSubmit: async (values) => {
      const newData={...props.donation,...values};
      await props.updateDonation(newData,props.auth.token);
      history.push('/dashboard')
    },
  });

  return (
    <div className="container">
      <h1>Donation Form</h1>
      <div className="row">
        <div className="col-12">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="donor" className="form-label">
                အလှူရှင်အမည်
              </label>
              <input
                type="text"
                className="form-control"
                id="donor"
                name="donor"
                placeholder="လူအမည် သို့မဟုတ် အဖွဲ့အစည်းအမည်"
                value={formik.values.donor}
                onChange={formik.handleChange}
              />
              {formik.errors.donor && (
                <div className="alert alert-secondary" role="alert">
                  {formik.errors.donor}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                ငွေပမာဏ
              </label>
              <input
                type="number"
                className="form-control"
                id="amount"
                name="amount"
                placeholder="english နံပါတ်ဖြင့်"
                value={formik.values.amount}
                onChange={formik.handleChange}
              />
              {formik.errors.amount && (
                <div className="alert alert-secondary" role="alert">
                  {formik.errors.amount}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="topic" className="form-label">
                အကြောင်းအရာ
              </label>
              <textarea
                placeholder="စစ်အာဏာရှင်စနစ်အမြစ်ပြတ်ပပျောက်ရေး"
                className="form-control"
                name="topic"
                id="topic"
                rows="5"
                value={formik.values.topic}
                onChange={formik.handleChange}
              ></textarea>
              {formik.errors.topic && (
                <div className="alert alert-secondary" role="alert">
                  {formik.errors.topic}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="signedBy" className="form-label">
                တာ၀န်ခံအမည်
              </label>
              <input
                type="text"
                className="form-control"
                id="signedBy"
                name="signedBy"
                placeholder="တာ၀န်ခံအမည်"
                value={formik.values.signedBy}
                onChange={formik.handleChange}
              />
              {formik.errors.signedBy && (
                <div className="alert alert-secondary" role="alert">
                  {formik.errors.signedBy}
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  donation:state.donationList.donation
});
export default connect(mapStateToProps, { updateDonation })(EditForm);
