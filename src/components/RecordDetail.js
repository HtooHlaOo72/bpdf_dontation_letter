import React from 'react';
import {connect} from 'react-redux';
import {fetchRecords} from '../actions/recordActions';


function RecordDetail(props){
    return (
    <div className='container'>
        <div className='row'>
            
        </div>
    </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    records:state.recordList.records,
  });
export default connect(mapStateToProps,{fetchRecords})(RecordDetail)