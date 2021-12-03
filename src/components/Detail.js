import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useEffect } from "react";
import {
  updateDonation,
  deleteDonation,
  setEditData,
  setGenerateData,
} from "../actions/donationActions";
import { setEditSupply } from "../actions/supplyAction";
import { Link } from "react-router-dom";
import convertId from "../utils/generateId";
import convertDate from "../utils/convertDate";
function Detail(props) {
  const {detailType}=useParams();
  const data = (detailType==='money')?props.donationGen:props.supply;
  const history = useHistory();
  const auth = props.auth;
  useEffect(() => {
    if (!auth.isAuthenticated) {
      history.push("/login");
    }
  }, [auth, history]);

  const deleteClick = async (_id) => {
    await props.deleteDonation(_id, props.auth.token);
    await props.setGenerateData({});
    history.push('/dashboard');
  };
  const updateClick = async (data) => {
    if(detailType==='money'){
      await props.setEditData(data);
    }else if(detailType==='supply'){
      await props.setEditSupply(data._id);
    }
    
    let editUrl=(detailType==='money')?"/edit":`/supply/update/${data._id}`;
    history.push(editUrl);
  };

  const exportClick = async (data) => {
    await props.setGenerateData(data);
    if (props.auth.isAuthenticated) history.push("/export/"+detailType);
  };
  return (
    <div className="container">
      <div className="row my-2">
        <div className="col-12">
          <h2 className="h1 ">Detail</h2>
          <Link className="goto-records" to="/dashboard">
            Back to Dashboard
          </Link>
          <hr />
        </div>

        {(auth.role === "admin" || auth.role === "moderator") && (
          <>
            <button
              className="col-4 btn btn-dark text-warning"
              onClick={() => {
                exportClick(data);
              }}
            >
              Export
            </button>
            <button
              className="col-4 btn btn-warning text-dark"
              onClick={() => {
                updateClick(data);
              }}
            >
              Edit
            </button>
            
          </>
        )}
        {
          (auth.role==='admin')&&
          <button
              className="col-4 btn btn-dark text-warning"
              onClick={() => {
                deleteClick(data._id);
              }}
            >
              Delete
            </button>
        }
        {

        }
        <div className="col-12 bg-warning text-dark mt-3 detail-item">
          <div className="col-12">
            <div className="row my-2">
              <div className="col-5">အလှူရှင်အမည်</div>
              <div className="col-2">=</div>
              <div className="col-5">{data.donor}</div>
            </div>
            <hr />
          </div>
          {
            (data.amount && data.unit )&&<div className="col-12">
            <div className="row my-2">
              <div className="col-5">ငွေပမာဏ</div>
              <div className="col-2">=</div>
              <div className="col-5">
                {data.amount &&
                  data.unit &&
                  data.amount + " " + data.unit}
              </div>
            </div>
            <hr />
          </div>
          }
          {(data.supply)&&<div className="col-12">
            <div className="row my-2">
              <div className="col-5">ထောက်ပံ့သောပစ္စည်း</div>
              <div className="col-2">=</div>
              <div className="col-5">{data.supply}</div>
            </div>
            <hr />
          </div>}
          {
            (data.date)&&
          <div className="col-12">
            <div className="row my-2">
              <div className="col-5">ရက်စွဲ</div>
              <div className="col-2">=</div>
              <div className="col-5">
                {data.date ? convertDate(data.date): ""}
              </div>
            </div>
            <hr />
          </div>
          }
          {(data.amountText)&&<div className="col-12">
            <div className="row my-2">
              <div className="col-5">ငွေပမာဏ(စာဖြင့်)</div>
              <div className="col-2">=</div>
              <div className="col-5">{data.amountText}</div>
            </div>
            <hr />
          </div>}
          {(data.signedBy)&&<div className="col-12">
            <div className="row my-2">
              <div className="col-5">တာဝန်ခံ</div>
              <div className="col-2">=</div>
              <div className="col-5">{data.signedBy}</div>
            </div>
            <hr />
          </div>}
          {(data.serialNo)&&<div className="col-12">
            <div className="row my-2">
              <div className="col-5">အမှတ်စဉ်</div>
              <div className="col-2">=</div>
              <div className="col-5">
                {data.serialNo ? ((detailType==='supply')?"S_":"") +convertId(data.serialNo) : ""}
              </div>
            </div>
            <hr />
          </div>}
          {(data.paymentType)&&<div className="col-12">
            <div className="row my-2">
              <div className="col-5">ငွေလွှဲသည့်နည်းလမ်း</div>
              <div className="col-2">=</div>
              <div className="col-5">{data.paymentType}</div>
            </div>
            <hr />
          </div>}
          {(data.receiverAcc)&&<div className="col-12">
            <div className="row my-2">
              <div className="col-5">ငွေလက်ခံနံပါတ်</div>
              <div className="col-2">=</div>
              <div className="col-5">{data.receiverAcc}</div>
            </div>
            <hr />
          </div>}
          {(data.transactionId)&&<div className="col-12">
            <div className="row my-2">
              <div className="col-5">လွှဲပြောင်းမှူအမှတ်စဉ်</div>
              <div className="col-2">=</div>
              <div className="col-5">{data.transactionId}</div>
            </div>
            <hr />
          </div>}
          {(data.extraNote)&&<div className="col-12">
            <div className="row my-2">
              <div className="col-5">Extra Note</div>
              <div className="col-2">=</div>
              <div className="col-5">{data.extraNote}</div>
            </div>
            <hr />
          </div>}
          
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  donationGen: state.donationList.donationGen,
  supply:state.supplyList.g_supply,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  updateDonation,
  deleteDonation,
  setEditData,
  setGenerateData,
  setEditSupply,
})(Detail);
