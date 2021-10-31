import {connect} from 'react-redux';
import {fetchDonations,deleteDonation,updateDonation,sortDonations,setEditData} from '../actions/donationActions';
import {useEffect,useState} from 'react';
import { useHistory } from 'react-router-dom';
import DonationDisplay from './DonationDisplay';

import {generateDocx} from '../utils/generateDocx';
function Dashboard(props){
    const [btnOpen,setBtnOpen]=useState(false);
    const history=useHistory();
    useEffect(
        ()=>{
            if(!props.auth.isAuthenticated) {
                history.push('/login')
            }else{
                props.fetchDonations(props.auth.token);
            }
            
        },[]
    );
    const deleteClick=(_id)=>{
        props.deleteDonation(_id,props.auth.token)
    };
    const updateClick=async (data)=>{
        await props.setEditData(data);
        history.push('/edit')
        // newData.donor="Edited Donor";
        // console.log(JSON.stringify(newData));
        // props.updateDonation(newData,props.auth.token)
    };
    const createClick=()=>{
        history.push('/donate')
        // newData.donor="Edited Donor";
        // console.log(JSON.stringify(newData));
        // props.updateDonation(newData,props.auth.token)
    }   
    const sortByAmount=()=>{
        props.sortDonations();
    }
    const generateClick=(donation)=>{
        console.log("Generate...")
        generateDocx("test.docx");
    }
    return (
        <div className='container'>
                <div className='row mt-4'>
                    <div className='col-12 col-sm-8 col-md-8 col-lg-8'>
                        <h1 className='dashboard-header'>Dashboard</h1>
                    </div>
                    <div className='col-6 col-sm-2 col-md-2 col-lg-2' >
                        <button className='btn btn-primary mx-2' onClick={createClick}>Create New</button>
                    </div>
                    <div className='col-6 col-sm-2 col-md-2 col-lg-2' >
                        <button className='btn btn-dark mx-2' onClick={sortByAmount}>Sort By Amount</button>
                    </div>
                </div>
                
                {
                    props.donations.map(
                        (donation)=>
                        <DonationDisplay 
                            key={donation._id} 
                            donation={donation} 
                            deleteClick={deleteClick}
                            updateClick={updateClick} 
                            generateClick={generateClick}
                        />
                    )
                }
            </div>
    );
}
const mapStateToProps=(state)=>({
    donations:state.donationList.donations,
    auth:state.auth
});
export default connect(mapStateToProps,{fetchDonations,sortDonations,updateDonation,deleteDonation,setEditData})(Dashboard);