import { useEffect } from "react";
import {connect} from "react-redux";
import { useHistory } from "react-router";

import {updateDonation,deleteDonation,setEditData,setGenerateData} from '../actions/donationActions';
function Detail(props){
    const donation=props.donationGen;
    const history=useHistory();
   
    const deleteClick=async(_id)=>{
        await props.deleteDonation(_id,props.auth.token);
        await props.setGenerateData({});        
    };
    const updateClick=async (data)=>{
        await props.setEditData(data);
        history.push('/edit');
    };

    const exportClick=async (donation)=>{
        await props.setGenerateData(donation);
        if(props.auth.isAuthenticated) history.push('/export');
    }
    return (
        <div className='container'>
            <div className='row'>
                <h1 className='h1'>Detail</h1>
                <button className='col-4 btn btn-dark text-warning' onClick={()=>{exportClick(donation)}}>Export</button>
                <button className='col-4 btn btn-dark text-warning' onClick={()=>{updateClick(donation)}}>Edit</button>
                <button className='col-4 btn btn-dark text-warning' onClick={()=>{deleteClick(donation._id)}}>Delete</button>
                <div className='col-12 bg-dark text-light mt-3 '>
                    <div className='col-12'>
                        {donation.donor}
                    </div>
                    <div className='col-12'>
                        {donation.amount}
                    </div>
                    <div className='col-12'>
                        {(donation.createdAt)?donation.createdAt.split('T')[0]:""}
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps=(state)=>({
    donationGen:state.donationList.donationGen,
    auth:state.auth,
});
export default connect(mapStateToProps,{updateDonation,deleteDonation,setEditData,setGenerateData})(Detail);