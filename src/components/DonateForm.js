import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useFormik } from "formik";

import { createDonation } from "../actions/donationActions";
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

  if (values.defaultTopic==="" && values.topic.length<=0) {
    errors.topic = "Required";
  } else if (values.topic.length > 600) {
    errors.topic = "Must be less than 600 characters";
  }

  if (!values.signedBy) {
    errors.signedBy = "Required";
  } else if (values.signedBy.length > 50) {
    errors.signedBy = "Must be 50 characters or less";
  }
  if (!values.unit) {
    errors.unit = "Required";
  } else if (values.unit.length > 50) {
    errors.unit = "Must be 50 characters or less";
  }
  if (!values.amountText) {
    errors.amountText = "Required";
  } else if (values.amountText > 50) {
    errors.amountText = "Must be 50 characters or less";
  }

  return errors;
};

function DonateForm(props) {
  const history = useHistory();
  //export component as image or pdf
  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      history.push("/login");
    }
  });
  const formik = useFormik({
    initialValues: {
      donor: "",
      amount: "",
      topic: "",
      signedBy: "",
      defaultTopic:"",
      unit:"MMK",
      amountText:""

    },
    validate,
    onSubmit: (values) => {
      
      let {donor,amount,signedBy,topic,unit,amountText,defaultTopic}=values;
      topic=(defaultTopic)?defaultTopic:topic;
      const newDonation={donor,amount,topic,signedBy,unit,amountText};
      props.createDonation(newDonation, props.auth.token);
      history.push("/dashboard");
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
              <label htmlFor="amountText" className="form-label">
                ငွေပမာဏ(စာဖြင့်)
              </label>
              <input
                type="text"
                className="form-control"
                id="amountText"
                name="amountText"
                placeholder="မြန်မာကျပ်ငွေ တစ်သောင်းတိတိ"
                value={formik.values.amountText}
                onChange={formik.handleChange}
              />
              {formik.errors.amountText && (
                <div className="alert alert-secondary" role="alert">
                  {formik.errors.amountText}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="signedBy" className="form-label">
                ငွေယူနစ်
              </label>
              <select className="form-select" 
                      aria-label="Default select example"
                      id="unit"
                      name="unit"
                      value={formik.values.unit}
                      onChange={formik.handleChange}
                      >
                <option value="MMK">MMK</option>
                <option value="USD">USD</option>
                <option value="THB">THB</option>
                
              </select>
              {formik.errors.unit && (
                <div className="alert alert-secondary" role="alert">
                  {formik.errors.unit}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="topic" className="form-label">
                အကြောင်းအရာ(အခြား)
              </label>
              <textarea
                placeholder="လိုအပ်သော..."
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
              အကြောင်းအရာ(မူရင်း)
              </label>
              <select className="form-select" 
                      aria-label="Default select example"
                      id="defaultTopic"
                      name="defaultTopic"
                      value={formik.values.defaultTopic}
                      onChange={formik.handleChange}
                      >
                <option value={formik.values.topic}>{formik.values.topic}</option>
                <option value="လိုအပ်သောနေရာများတွင် အသုံးပြုနိုင်ရန်">လိုအပ်သောနေရာများတွင် အသုံးပြုနိုင်ရန်</option>
                <option value="လိုအပ်သောစားနပ်ရိက္ခာများ ၀ယ်ယူနိုင်ရန်">လိုအပ်သောစားနပ်ရိက္ခာများ ၀ယ်ယူနိုင်ရန်</option>
                <option value="လိုအပ်သောလက်နက်ခဲယမ်းများ ၀ယ်ယူနိုင်ရန်">လိုအပ်သောလက်နက်ခဲယမ်းများ ၀ယ်ယူနိုင်ရန်</option>
                <option value="လိုအပ်သော ဆေး၀ါးများ၀ယ်ယူနိုင်ရန်">လိုအပ်သော ဆေး၀ါးများ၀ယ်ယူနိုင်ရန်</option>
              </select>
              {formik.errors.defaultTopic && (
                <div className="alert alert-secondary" role="alert">
                  {formik.errors.defaultTopic}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="signedBy" className="form-label">
                တာဝန်ခံ
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
            <button type="submit" className="btn btn-warning">
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
  donations:state.donationList.donations
});
export default connect(mapStateToProps, { createDonation })(DonateForm);
