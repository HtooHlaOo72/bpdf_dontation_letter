import {connect} from 'react-redux';
import {fetchDonations,deleteDonation,updateDonation,sortDonations,setEditData,setGenerateData} from '../actions/donationActions';
import {useEffect,useState} from 'react';
import { useHistory } from 'react-router-dom';
import DonationDisplay from './DonationDisplay';
import {useFormik} from 'formik';
function Dashboard(props){
    const history=useHistory();
    const [filterOpen,setFilterOpen]=useState(false);
    const [filterDay,setFilterDay]=useState('');
    
    useEffect(
        ()=>{
            if(!props.auth.isAuthenticated) {
                history.push('/login')
            }else{
                props.fetchDonations(props.auth.token);
            }
        }
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
        if(props.donationGen?._id===donation._id) history.push('/export');
    }
    return (
        <div className='container'>
                <div className='row mt-4 mb-2'>
                    <div className='col-12 col-sm-8 col-md-8 col-lg-8'>
                        <h1 className='dashboard-header'>Dashboard</h1>
                    </div>
                    <div className='col-12 col-sm-4 col-md-4 col-lg-4 d-flex justify-content-end' >
                        <button className='btn create-btn' onClick={createClick}>Create New</button>
                        <button className='btn del-btn' onClick={()=>{setFilterOpen(!filterOpen)}}>{(filterOpen)?"Close Filter":"Open Filter"}</button>
                    </div>
                </div>
                {
                    (filterOpen)&&
                    <form className="row g-3 d-flex justify-content-end">
                    <div className="col-auto">
                      <label htmlFor="filterDay" className="form-label">Day to Filter</label>
                      <input    type="date" 
                                className="form-control" 
                                id="filterDay" 
                                name="filterDay"
                                value={filterDay}
                                onChange={(e)=>{setFilterDay(e.target.value)}}
                        />
                    </div>
                    <div className="col-auto">
                      <button 
                      type="button" 
                      className="btn btn-warning border border-dark mb-3"
                      onClick={()=>{setFilterDay("")}}
                      >Apply No Filter</button>
                    </div>
                  </form>
                }
                {
                    props.donations
                    .filter((data)=>{
                        console.log(filterDay);
                        if(filterDay==="") return true;
                        const [year,month,day]=data.createdAt.split("T")[0].split("-");
                        const [yearF,monthF,dayF,]=filterDay.split("-");
                        console.log(year,month,day,yearF,monthF,dayF);
                        return (year===yearF && month===monthF && day===dayF);
                    })
                    .sort(
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
    auth:state.auth,
    donationGen:state.donationList.donationGen,
});
export default connect(mapStateToProps,{fetchDonations,sortDonations,updateDonation,deleteDonation,setEditData,setGenerateData})(Dashboard);