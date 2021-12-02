import { connect } from "react-redux";
import { fetchDonations, setGenerateData } from "../actions/donationActions";
import {
  fetchSupplies,
  setEditSupply,
  setGenerateSupply,
} from "../actions/supplyAction";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MySwal } from "../utils/MySwal";
import { Link } from "react-router-dom";
import DonationDisplay from "./DonationDisplay";
function Dashboard(props) {
  const history = useHistory();
  const { fetchDonations, fetchSupplies, auth } = props;
  const [filterOpen, setFilterOpen] = useState(false);
  const [showDonation, setShowDonation] = useState(true);
  const [fromDay, setFromDay] = useState("2021-01-01");
  const [mm, dd, yy] = new Date("1/1/25").toLocaleDateString().split("/");
  const [toDay, setToDay] = useState(
    `${yy}-${mm.length !== 2 ? "0" + mm : mm}-${
      dd.length !== 2 ? "0" + dd : dd
    }`
  );

  useEffect(() => {
    const getData = async () => {
      await fetchSupplies(auth.token);
      await fetchDonations(auth.token);
    };
    if (!auth.isAuthenticated) {
      history.push("/login");
    } else {
      getData();
    }
  }, [history, fetchDonations, auth, fetchSupplies]);

  const createClick = async () => {
    MySwal.fire({
      title: "Choose type to create?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Money",
      denyButtonText: `Supply`,
    }).then((resp) => {
      if (resp.isConfirmed) {
        history.push("/donate");
      } else if (resp.isDenied) {
        props.setEditSupply("61a8a349daa25e2c7f0aa659");
        history.push("/supply/create");
      }
    });
  };
  const generateClick = async (donation) => {
    await props.setGenerateData(donation);
  };

  return (
    <div className="container">
      <div className="row mt-4 mb-2">
        <div className="col-12 col-sm-8 col-md-8 col-lg-8 mb-3">
          <h1 className="fw-bolder dashboard-header">Dashboard</h1>
          {props.auth.role === "admin" && (
            <>
              <Link className="fw-bold goto-records bg-warning" to="/records">
                View Records
              </Link>
              <Link
                className="fw-bold goto-records bg-warning"
                to="/recorddetail"
              >
                Records Detail
              </Link>
              <Link
                className="fw-bold goto-records bg-warning"
                to="/changepassword"
              >
                Change Password
              </Link>
            </>
          )}
        </div>
        {(props.auth.role === "admin" || props.auth.role === "moderator") && (
          <div className="col-12 col-sm-4 col-md-4 col-lg-4 d-flex justify-content-end">
            <button className="btn create-btn" onClick={createClick}>
              Create New
            </button>
            <button
              className="btn del-btn"
              onClick={() => {
                setFilterOpen(!filterOpen);
              }}
            >
              {filterOpen ? "Close Filter" : "Open Filter"}
            </button>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-6">
          <h4 className="h4 text-bold">
            {showDonation ? "Money Donations" : "Supplies"}
          </h4>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <button
            className="fw-bold bg-dark text-warning"
            id="showDonationBtn"
            onClick={() => {
              setShowDonation(!showDonation);
            }}
          >
            {showDonation ? "Covert to Supply" : "Convert to Money"}
          </button>
        </div>
      </div>
      {filterOpen && (
        <form className="row g-3 d-flex justify-content-end">
          <div className="col-auto">
            <label htmlFor="filterDay" className="form-label">
              From
            </label>
            <input
              type="date"
              className="form-control"
              id="filterDay"
              name="filterDay"
              value={fromDay}
              onChange={(e) => {
                setFromDay(e.target.value);
              }}
            />
          </div>
          <div className="col-auto">
            <label htmlFor="filterDay" className="form-label">
              To
            </label>
            <input
              type="date"
              className="form-control"
              id="filterDay"
              name="filterDay"
              value={toDay}
              onChange={(e) => {
                setToDay(e.target.value);
              }}
            />
          </div>
          <hr />
        </form>
      )}
      {showDonation &&
        props.donations
          .filter((data) => {
            if (fromDay === "") return true;
            const dataDate = new Date(data.date);
            const fromDate = new Date(fromDay);
            const toDate = new Date(toDay);

            return dataDate >= fromDate && dataDate <= toDate;
          })
          .sort((a, b) => {
            // let aDate = new Date(a.date);
            // let bDate = new Date(b.date);
            return a.serialNo - b.serialNo;
          })
          .map((donation) => (
            <DonationDisplay
              key={donation._id}
              donation={donation}
              generateClick={generateClick}
              type="money"
            />
          ))}
      {!showDonation &&
        props.supplies
          .filter((data) => {
            if (fromDay === "") return true;
            const dataDate = new Date(data.date);
            const fromDate = new Date(fromDay);
            const toDate = new Date(toDay);

            return dataDate >= fromDate && dataDate <= toDate;
          })
          .sort((a, b) => {
            // let aDate = new Date(a.date);
            // let bDate = new Date(b.date);
            return a.serialNo - b.serialNo;
          })
          .map((supply) => (
            <DonationDisplay
              key={supply._id}
              supply={supply}
              generateClick={props.setGenerateSupply}
              type="supply"
            />
          ))}
    </div>
  );
}
const mapStateToProps = (state) => ({
  donations: state.donationList.donations,
  auth: state.auth,
  donationGen: state.donationList.donationGen,
  supplies: state.supplyList.supplies,
});
export default connect(mapStateToProps, {
  fetchDonations,
  fetchSupplies,
  setGenerateData,
  setEditSupply,
  setGenerateSupply,
})(Dashboard);
