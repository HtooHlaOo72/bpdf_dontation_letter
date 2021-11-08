import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
  } else if (values.amount < 1) {
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
  if (!values.paymentType) {
    errors.paymentType = "Required";
  } else if (values.paymentType.length > 50) {
    errors.paymentType = "Must be 50 characters or less";
  }
  if (!values.receiverAcc) {
    errors.receiverAcc = "Required";
  } else if (values.receiverAcc < 9999) {
    errors.receiverAcc = "Must be 5 digits or more";
  }
  if (!values.transactionId) {
    errors.transactionId = "Required";
  } else if (values.transactionId < 9999) {
    errors.transactionId = "Must be 5 digits or more";
  }
  return errors;
};

function EditForm(props) {
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    setLoading(false);
  },[props.auth.error]);
  const history=useHistory();
  //export component as image or pdf
  useEffect(()=>{
    if(!props.auth.isAuthenticated  && !(props.donation.donor && props.donation.amount && props.donation.topic && props.donation.signedBy)){
      history.push('/login');
    }

  });
  const formik = useFormik({
    initialValues: {
      donor: props.donation.donor?props.donation.donor:"",
      amount: props.donation.amount?props.donation.amount:"",
      topic: props.donation.topic?props.donation.topic:"",
      signedBy: props.donation.signedBy?props.donation.signedBy:"",
      unit: props.donation.unit?props.donation.unit:"",
      amountText: props.donation.amountText?props.donation.amountText:"",
      paymentType:props.donation.paymentType?props.donation.paymentType:"",
      transactionId:props.donation.transactionId?props.donation.transactionId:"",
      receiverAcc:props.donation.receiverAcc?props.donation.receiverAcc:""
    },
    validate,
    onSubmit: (values) => {
      let { topic, defaultTopic } = values;
      topic = defaultTopic ? defaultTopic : topic;
      values.topic=topic;
      let changedData={};
      for(let i in values){
        if(props.donation[i]!==values[i]){
          changedData[i]=values[i];
        }
      }
      changedData._id=props.donation._id
      console.log(changedData,'changedata');
      setLoading(true);
      
      props.updateDonation(changedData, props.auth.token);
      setLoading(false);
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
                <div className="alert alert-danger" role="alert">
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
                <div className="alert alert-danger" role="alert">
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
                <div className="alert alert-danger" role="alert">
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
                <div className="alert alert-danger" role="alert">
                  {formik.errors.unit}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="paymentType" className="form-label">
                ငွေပေးချေသည့်နည်းလမ်း
              </label>
              <select className="form-select" 
                      aria-label="Default select example"
                      id="paymentType"
                      name="paymentType"
                      value={formik.values.paymentType}
                      onChange={formik.handleChange}
                      >
                <option value="KBZ-PAY">KBZ-PAY</option>
                <option value="WAVE-PAY">WAVE-PAY</option>
                <option value="CB-PAY">CB-PAY</option>
                <option value="AYA-PAY">AYA-PAY</option>
                <option value="KBZ-BANK">KBZ-BANK</option>
                <option value="CB-BANK">CB-BANK</option>
                <option value="AYA-BANK">AYA-BANK</option>
                <option value="YOMA-BANK">YOMA-BANK</option>
                <option value="PAYPAL">PAYPAL</option>
                <option value="VISA">VISA</option>
                <option value="ZELLE">ZELLE</option>
                <option value="KASIKORN-BANK">KASIKORN-BANK</option>
              </select>
              {formik.errors.payment && (
                <div className="alert alert-danger" role="alert">
                  {formik.errors.paymentType}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="transactionId" className="form-label">
                ငွေလွှဲပြောင်းမှုအမှတ်စဉ်
              </label>
              <input
                type="number"
                className="form-control"
                id="transactionId"
                name="transactionId"
                placeholder="0000-1111-2222-3333"
                value={formik.values.transactionId}
                onChange={formik.handleChange}
              />
              {formik.errors.transactionId && (
                <div className="alert alert-danger" role="alert">
                  {formik.errors.transactionId}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="transactionId" className="form-label">
                ငွေလက်ခံအကောင့်
              </label>
              <input
                type="number"
                className="form-control"
                id="receiverAcc"
                name="receiverAcc"
                placeholder="0000-1111-2222-3333"
                value={formik.values.receiverAcc}
                onChange={formik.handleChange}
              />
              {formik.errors.receiverAcc && (
                <div className="alert alert-danger" role="alert">
                  {formik.errors.receiverAcc}
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
                <div className="alert alert-danger" role="alert">
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
                <div className="alert alert-danger" role="alert">
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
                <div className="alert alert-danger" role="alert">
                  {formik.errors.signedBy}
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-warning" disabled={loading}>
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
