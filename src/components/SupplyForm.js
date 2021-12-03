import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { useFormik } from "formik";

import { updateSupply,createSupply } from "../actions/supplyAction";
import { MySwal } from "../utils/MySwal";
import { connect } from "react-redux";

const validate = (values) => {
  const errors = {};
  if (!values.donor) {
    errors.donor = "Required";
  } else if (values.donor.length > 50) {
    errors.donor = "Must be 50 characters or less";
  }
  if (values.supply === "" && values.supply.length <= 0) {
    errors.supply = "Required";
  } else if (values.topic.length > 600) {
    errors.supply = "Must be less than 600 characters";
  }
  if (values.defaultTopic === "" && values.topic.length <= 0) {
    errors.topic = "Required";
  } else if (values.topic.length > 600) {
    errors.topic = "Must be less than 600 characters";
  }
  if (!values.date) {
    errors.date = "Required";
  }
  if (!values.signedBy) {
    errors.signedBy = "Required";
  } else if (values.signedBy.length > 50) {
    errors.signedBy = "Must be 50 characters or less";
  }

  if (values.extraNote && values.extraNote.length > 150) {
    errors.extraNote = "Must be 150 or less characters!";
  }
  return errors;
};

function SupplyForm(props) {
  const [loading, setLoading] = useState(false);
  const { action, s_id } = useParams();

  useEffect(() => {
    setLoading(false);
  }, [props.auth.error]);
  const history = useHistory();
  //export component as image or pdf
  useEffect(() => {
    // if(!props.auth.isAuthenticated  && !(props.supplies.donor && props.supplies.amount && props.supplies.topic && props.supplies.signedBy)){
    //   history.push('/login');
    // }
  });

  const getInit = () => {
    if (action === "update" && s_id) {
      return { ...props.supply };
    }
    let ini_val = {
      donor: "",
      supply: "",
      updateDate: "",
      topic: "",
      signedBy: "",
      extraNote: "",
    };

    return ini_val;
  };
  const formik = useFormik({
    initialValues: getInit(),
    validate,
    onSubmit:(values) => {
      MySwal.fire({
        title: "Are you sure want to submit?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Submit",
      })
        .then(async (data) => {
          if (data.isConfirmed) {
            if (action === "update" && s_id) {
              const data = await props.supply;
              values.topic = values.defaultTopic
                ? values.defaultTopic
                : values.topic;
              let changedData = {};
              for (let p in data) {
                if (values[p] !== data[p]) {
                  changedData[p] = values[p];
                }
              }
              changedData._id =await  data._id;
              await props.updateSupply(changedData,props.auth.token);
              history.push('/dashboard');
            }else{
                values.topic = values.defaultTopic
                ? values.defaultTopic
                : values.topic;
                props.createSupply(values,props.auth.token);
                history.push('/dashboard');
            }

            //history.push("/dashboard");
          }
        })
        .catch((e) => {
          MySwal.fire({
            icon: "warning",
            title: "Error In Editing",
          });
        });
    },
  });

  return (
    <div className="container">
      <h1>Supply Form </h1>
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
              <label htmlFor="date" className="form-label">
                ရက်စွဲ
              </label>
              <input
                type="date"
                className="form-control"
                min="2021-01-02"
                id="date"
                name="date"
                placeholder="ရက်စွဲ"
                value={formik.values.date}
                onChange={formik.handleChange}
              />
              {formik.errors.date && (
                <div className="alert alert-danger" role="alert">
                  {formik.errors.date}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="topic" className="form-label">
                ထောက်ပံ့သောအရာ
              </label>
              <textarea
                placeholder="လိုအပ်သော..."
                className="form-control"
                name="supply"
                id="supply"
                rows="5"
                value={formik.values.supply}
                onChange={formik.handleChange}
              ></textarea>
              {formik.errors.supply && (
                <div className="alert alert-danger" role="alert">
                  {formik.errors.supply}
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
              <select
                className="form-select"
                aria-label="Default select example"
                id="defaultTopic"
                name="defaultTopic"
                value={formik.values.defaultTopic}
                onChange={formik.handleChange}
              >
                <option value={formik.values.topic}>
                  {formik.values.topic}
                </option>
                <option value="လိုအပ်သောနေရာများတွင် အသုံးပြုနိုင်ရန်">
                  လိုအပ်သောနေရာများတွင် အသုံးပြုနိုင်ရန်
                </option>
                <option value="လိုအပ်သောစားနပ်ရိက္ခာများ ၀ယ်ယူနိုင်ရန်">
                  လိုအပ်သောစားနပ်ရိက္ခာများ ဝယ်ယူနိုင်ရန်
                </option>
                <option value="လိုအပ်သောလက်နက်ခဲယမ်းများ ၀ယ်ယူနိုင်ရန်">
                  လိုအပ်သောလက်နက်ခဲယမ်းများ ၀ယ်ယူနိုင်ရန်
                </option>
                <option value="လိုအပ်သော ဆေး၀ါးများ၀ယ်ယူနိုင်ရန်">
                  လိုအပ်သော ဆေး၀ါးများ၀ယ်ယူနိုင်ရန်
                </option>
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
            <div className="mb-3">
              <label htmlFor="donor" className="form-label">
                Extra Note
              </label>
              <textarea
                className="form-control"
                id="extraNote"
                name="extraNote"
                placeholder="Add Some Note..."
                value={formik.values.extraNote}
                onChange={formik.handleChange}
              />
              {formik.errors.extraNote && (
                <div className="alert alert-danger" role="alert">
                  {formik.errors.extraNote}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-warning"
              disabled={loading}
            >
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
  supply: state.supplyList.e_supply,
});
export default connect(mapStateToProps, { updateSupply,createSupply })(SupplyForm);
