import { useEffect, useState } from "react";
import { fetchRecords, deleteRecords } from "../actions/recordActions";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import * as dayjs from 'dayjs';

const RecordItem = ({ recordText }) => (
  <div className="row my-2 record-item">
    <div className="col-12">
      <div className="alert alert-info text-dark">{recordText}</div>
    </div>
  </div>
);
function RecordDisplay(props) {
  const records = props.records;
  const { fetchRecords, deleteRecords } = props;
  const history = useHistory();
  const auth = props.auth;
  const [showAll,setShowAll]=useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      history.push("/login");
    } else {
      fetchRecords(auth.token);
    }
    
  }, [fetchRecords, history, auth,records]);
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-6">
          <h1 className="fw-bolder dashboard-header">Records </h1>
          <Link className="fw-bold goto-records" to="/dashboard">
            Back to Dashboard
          </Link>
        </div>
        <div className="col-3">
          <button
            className="btn btn-dark text-warning"
            onClick={() => {
              deleteRecords(auth.token);
            }}
          >
            Delete All
          </button>
        </div>
        <div className="col-3">
          <button
            className="btn btn-warning text-dark border border-dark"
            onClick={() => {
              setShowAll(!showAll);
            }}
          >
              {
                  (showAll)?"Five Days":"Show All"
              }
          </button>
        </div>
      </div>
      
      {records
        .filter((rc) => {
           let startDay=dayjs().subtract(5,'day');
           let rcDay=dayjs(rc.createdAt);
           return (showAll)?true:rcDay>startDay;
        })
        .map((record) => (
          <RecordItem key={record._id} recordText={record.action} />
        ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  records: state.recordList.records,
});
export default connect(mapStateToProps, { fetchRecords, deleteRecords })(
  RecordDisplay
);
