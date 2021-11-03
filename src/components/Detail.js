import { connect } from "react-redux";
import { useHistory } from "react-router";
import { useEffect } from "react";
import {
  updateDonation,
  deleteDonation,
  setEditData,
  setGenerateData,
} from "../actions/donationActions";
import convertId from "../utils/generateId";
function Detail(props) {
  const donation = props.donationGen;
  const history = useHistory();
  const auth=props.auth;
  useEffect(()=>{
      if(!auth.isAuthenticated)
      {
          history.push('/login');
      }
  },[auth,history]);

  const deleteClick = async (_id) => {
    await props.deleteDonation(_id, props.auth.token);
    await props.setGenerateData({});
  };
  const updateClick = async (data) => {
    await props.setEditData(data);
    history.push("/edit");
  };

  const exportClick = async (donation) => {
    await props.setGenerateData(donation);
    if (props.auth.isAuthenticated) history.push("/export");
  };
  return (
    <div className="container">
      <div className="row my-2">
        <h1 className="h1 ">Detail</h1>
        <hr />
        <button
          className="col-4 btn btn-dark text-warning"
          onClick={() => {
            exportClick(donation);
          }}
        >
          Export
        </button>
        <button
          className="col-4 btn btn-warning text-dark"
          onClick={() => {
            updateClick(donation);
          }}
        >
          Edit
        </button>
        <button
          className="col-4 btn btn-dark text-warning"
          onClick={() => {
            deleteClick(donation._id);
          }}
        >
          Delete
        </button>
        <div className="col-12 bg-warning text-dark mt-3 detail-item">
          <div className="col-12">
            <div className="row my-2">
              <div className="col-5">အလှူရှင်အမည်</div>
              <div className="col-2">-</div>
              <div className="col-5">{donation.donor}</div>
            </div>
            <hr />
          </div>
          <div className="col-12">
            <div className="row my-2">
              <div className="col-5">ငွေပမာဏ</div>
              <div className="col-2">=</div>
              <div className="col-5">
                {donation.amount + " " + donation.unit}
              </div>
            </div>
            <hr />
          </div>
          <div className="col-12">
            <div className="row my-2">
              <div className="col-5">ရက်စွဲ</div>
              <div className="col-2">=</div>
              <div className="col-5">
                {donation.createdAt ? donation.createdAt.split("T")[0] : ""}
              </div>
            </div>
            <hr />
          </div>
          <div className="col-12">
            <div className="row my-2">
              <div className="col-5">ငွေပမာဏ(စာဖြင့်)</div>
              <div className="col-2">=</div>
              <div className="col-5">{donation.amountText}</div>
            </div>
            <hr />
          </div>
          <div className="col-12">
            <div className="row my-2">
              <div className="col-5">တာဝန်ခံ</div>
              <div className="col-2">=</div>
              <div className="col-5">{donation.signedBy}</div>
            </div>
            <hr />
          </div>
          <div className="col-12">
            <div className="row my-2">
              <div className="col-5">အမှတ်စဉ်</div>
              <div className="col-2">=</div>
              <div className="col-5">
                {donation.serialNo
                  ? convertId(donation.serialNo)
                  : donation.serialNo}
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  donationGen: state.donationList.donationGen,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  updateDonation,
  deleteDonation,
  setEditData,
  setGenerateData,
})(Detail);
