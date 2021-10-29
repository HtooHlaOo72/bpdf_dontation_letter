import { useState } from "react";
import { deleteDonation } from "../actions/donationActions";
import { connect } from "react-redux";
function DonatonDisplay(props) {
  const { donation } = props;
  const [showDetail, setShowDetail] = useState(false);
  const switchDetail = () => {
    setShowDetail(!showDetail);
  };
  return (
    <div className="row bg-warning my-3">
      <div className="col-12 col-sm-7 col-md-7 col-lg-7">
        <p>{donation.donor}</p>
        <p>{donation._id}</p>
        <p>{donation.createdAt.split("T")[0]}</p>
      </div>
      <div className="col-12 col-sm-5 col-md-5 col-lg-5 btn-box">
        <button className="btn btn-info dashboard-btn mx-2" onClick={switchDetail}>
          detail
        </button>
        <button
          className="btn btn-light dashboard-btn mx-2"
          onClick={() => props.updateClick(donation)}
        >
          edit
        </button>
        <button
          className="btn btn-danger dashboard-btn mx-2"
          onClick={() => props.deleteClick(donation._id)}
        >
          delete
        </button>
      </div>

      {showDetail && (
        <div className="container">
          <div className="row">
            <div className="col-5">လှူတန်းသူ</div>
            <div className="col-2">=</div>
            <div className="col-5">{donation.donor}</div>
          </div>
          <div className="row ">
            <div className="col-5">ငွေပမာဏ</div>
            <div className="col-2">=</div>
            <div className="col-5">{donation.amount}</div>
          </div>
          <div className="row">
            <div className="col-5">အကြောင်းအရာ</div>
            <div className="col-2">=</div>
            <div className="col-5">{donation.topic}</div>
          </div>
          <div className="row">
            <div className="col-5">တာ၀န်ခံ</div>
            <div className="col-2">=</div>
            <div className="col-5">{donation.signedBy}</div>
          </div>
          <div className="row">
            <div className="col-5">Serial Number</div>
            <div className="col-2">=</div>
            <div className="col-5">{donation.serialNo}</div>
          </div>
        </div>
      )}
      <hr />
    </div>
  );
}

export default connect(null, { deleteDonation })(DonatonDisplay);
