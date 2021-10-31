import {connect} from 'react-redux';
import {fetchDonations,deleteDonation,updateDonation,sortDonations,setEditData,setGenerateData} from '../actions/donationActions';
import {useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DonationDisplay from './DonationDisplay';

function Dashboard(props){
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
    const generateClick=async (donation)=>{
        await props.setGenerateData(donation);
        history.push('/export')
    }
    return (
        <div className='container'>
                <div className='row mt-4'>
                    <div className='col-12 col-sm-8 col-md-8 col-lg-8'>
                        <h1 className='dashboard-header'>Dashboard</h1>
                    </div>
                    <div className='col-6 col-sm-2 col-md-2 col-lg-2' >
                        <button className='btn create-btn' onClick={createClick}>Create New</button>
                    </div>
                    <div className='col-6 col-sm-2 col-md-2 col-lg-2' >
                        <button className='btn del-btn' onClick={sortByAmount}>Filter By Date</button>
                    </div>
                </div>
                
                {
                    props.donations.sort(
                        (a,b)=>{
                            let aDate=new Date(a.createdAt.split("T")[0]);
                            let bDate=new Date(b.createdAt.split("T")[0]);
                            return aDate-bDate;
                          }
                    ).map(
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
export default connect(mapStateToProps,{fetchDonations,sortDonations,updateDonation,deleteDonation,setEditData,setGenerateData})(Dashboard);