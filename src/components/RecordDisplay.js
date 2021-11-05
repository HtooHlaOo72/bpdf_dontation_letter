import { useEffect} from 'react';
import { fetchRecords,deleteRecords } from '../actions/recordActions';
import {connect} from 'react-redux';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';
const RecordItem=({recordText})=>(
    <div className='row my-2 record-item'>
        <div className='col-12'>
            <div className='alert alert-info text-dark'>
                {recordText}
            </div>
        </div>
    </div>
)
function RecordDisplay(props){
    const records=props.records;
    const {fetchRecords,deleteRecords}=props;
    const history=useHistory();
    const auth=props.auth;
    useEffect(()=>{
        if(!auth.isAuthenticated){
            history.push("/login");
        }else{
            fetchRecords(auth.token);
        }
    },[fetchRecords,history,auth]);
    return (
        <div className='container'>
            <div className='row mt-4'>
                <div className='col-8'>
                    <h1 className='fw-bolder dashboard-header' >Records </h1>
                    <Link className="fw-bold goto-records" to='/dashboard'>Back to Dashboard</Link>
                </div>
                <div className='col-4'>
                    <button  className='btn btn-dark text-warning' onClick={()=>{deleteRecords(auth.token)}}>Delete All</button>
                </div>
            </div>
            {
              records.map((rc)=><RecordItem key={rc._id} recordText={rc.action} />)
            }
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    records:state.recordList.records,
  });
export default connect(mapStateToProps,{fetchRecords,deleteRecords})(RecordDisplay)