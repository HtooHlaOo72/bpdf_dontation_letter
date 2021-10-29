import {connect} from 'react-redux';
import {fetchDonations,deleteDonation,updateDonation,setEditData} from '../actions/donationActions';
import {useEffect,useState} from 'react';
import { useHistory } from 'react-router-dom';
import DonationDisplay from './DonationDisplay';
function Dashboard(props){
    const history=useHistory();
    const [donations,setDonations]=useState([...props.donations]);
    useEffect(
        ()=>{
            if(!props.auth.isAuthenticated) history.push('/login')
            props.fetchDonations(props.auth.token);
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
        let newDonations=props.donations.map((donation)=>donation.createdAt=donation.createdAt.split("T")[0]).sort(( a,b)=>{
            a=a.amount;
            b=b.amount;
            return b-a;
        });
        setDonations(newDonations);
    }

    return (
        <div className='container-fluid'>
            
            {
            (donations)?
            <div className='container'>
                <div className='row mt-4'>
                    <div className='col-8'>
                        <h1>Dashboard</h1>
                    </div>
                    <div className='col-4' >
                        <button className='btn btn-primary mx-2' onClick={createClick}>Create New</button>
                        <button className='btn btn-dark mx-2' onClick={sortByAmount}>Sort By Date</button>
                    </div>
                    
                </div>
                
                {props.donations.map((donation)=>
                <DonationDisplay 
                    key={donation._id} 
                    donation={donation} 
                    deleteClick={deleteClick}
                    updateClick={updateClick} 
                />
                )}
            </div>
            :<p className='bg-dark'>Loading...</p>
            }
        </div>
    );
}
const mapStateToProps=(state)=>({
    donations:state.donationList.donations,
    auth:state.auth
});
export default connect(mapStateToProps,{fetchDonations,updateDonation,deleteDonation,setEditData})(Dashboard);