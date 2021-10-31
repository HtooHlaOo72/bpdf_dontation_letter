import { useState } from "react";
import { deleteDonation } from "../actions/donationActions";
import { connect } from "react-redux";
function DonatonDisplay(props) {
  const { donation } = props;
  const [showDetail, setShowDetail] = useState(false);
  const [btnOpen, setBtnOpen] = useState(false);
  const switchDetail = () => {
    setBtnOpen(false);
    setShowDetail(!showDetail);
  };
  return (
    <div className="row bg-warning my-3 item">
      <div className="col-12 col-sm-7 col-md-7 col-lg-7">
        <p>{donation.donor}</p>
        <p>{donation._id}</p>
        <p>{donation?.createdAt?.split("T")[0]}</p>
      </div>
      <div className="col-12 col-sm-5 col-md-5 col-lg-5 item-side-bar">
      {btnOpen && (
            <div className="more-btn-box">
              <button className="btn btn-info " onClick={switchDetail}>
                {(showDetail)?"Close Detail":"Detail"}
              </button>
              <button
                className="btn btn-light "
                onClick={() => props.updateClick(donation)}
              >
                edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => props.deleteClick(donation._id)}
              >
                delete
              </button>
              <button
                className="btn btn-success"
                onClick={() => {
                  props.generateClick();
                }}
              >
                Generate
              </button>
            </div>
          )}
        <div className="more-btn">
          <button className="btn btn-info more" onClick={() => setBtnOpen(!btnOpen)}>
            More
          </button>
        </div>
      </div>

      {showDetail && (
        <div className="container">
          <div className="row donation-item">
            <div className="col-5">လှူတန်းသူ</div>
            <div className="col-2">=</div>
            <div className="col-5">{donation.donor}</div>
          </div>
          <div className="row donation-item">
            <div className="col-5">ငွေပမာဏ</div>
            <div className="col-2">=</div>
            <div className="col-5">{donation.amount}</div>
          </div>
          <div className="row donation-item">
            <div className="col-5">အကြောင်းအရာ</div>
            <div className="col-2">=</div>
            <div className="col-5">
              <p>{donation.topic}</p>
            </div>
          </div>
          <div className="row donation-item">
            <div className="col-5">တာ၀န်ခံ</div>
            <div className="col-2">=</div>
            <div className="col-5">{donation.signedBy}</div>
          </div>
          <div className="row donation-item">
            <div className="col-5">Serial Number</div>
            <div className="col-2">=</div>
            <div className="col-5">{donation.serialNo}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect(null, { deleteDonation })(DonatonDisplay);
