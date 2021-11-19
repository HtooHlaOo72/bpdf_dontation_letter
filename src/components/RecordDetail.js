import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import { useHistory } from 'react-router';
import {fetchRecords} from '../actions/recordActions';
import recordCount from '../utils/recordCount';
import {Link} from 'react-router-dom';

function RecordDetail(props){
    let history=useHistory();
    const auth=props.auth;
    const records=props.records;
    const {fetchRecords}=props;
    useEffect(() => {
        if (!auth.isAuthenticated) {
          history.push("/login");
        } else {
          fetchRecords(auth.token);
        }
      }, [ fetchRecords ,history, auth,records]);

    return (
    <div className='container'>
        <div className='row mb-3'>
            <div className='col-12'>
            <h1>Record Detail</h1>
            <Link className="fw-bold goto-records bg-warning" to="/dashboard">
                Back to Dashboard
            </Link>
            </div>
            
        </div>
        
        <div className='row gx-2'>
            {
               recordCount(records.map(rc=>rc.action.split(' ')[0])).map((data)=>(
                   <div className='col-12 bg-warning py-3 my-1 item-box'>{data.name+' made '+data.count+' Records'}</div>
               ))
            }
        </div>
    </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    records:state.recordList.records,
  });
export default connect(mapStateToProps,{fetchRecords})(RecordDetail)