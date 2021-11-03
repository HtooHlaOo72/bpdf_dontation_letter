import {connect} from 'react-redux';
import {fetchDonations,setGenerateData} from '../actions/donationActions';
import {useEffect,useState} from 'react';
import { useHistory } from 'react-router-dom';
import DonationDisplay from './DonationDisplay';
function Dashboard(props){
    const history=useHistory();
    const {fetchDonations,auth}=props;
    const [filterOpen,setFilterOpen]=useState(false);
    const [fromDay,setFromDay]=useState('2021-01-01');
    const [mm,dd,yy]=new Date().toLocaleDateString().split("/");
    const [toDay,setToDay]=useState(`${yy}-${(mm.length!==2)?"0"+mm:mm}-${(dd.length!==2)?"0"+dd:dd}`);
    
    useEffect(
        ()=>{
            if(!auth.isAuthenticated) {
                history.push('/login')
            }else{
                fetchDonations(auth.token);
            }
        },[history,fetchDonations,auth]
    );
    
    const createClick=()=>{
        history.push('/donate')
        // newData.donor="Edited Donor";
        // console.log(JSON.stringify(newData));
        // props.updateDonation(newData,props.auth.token)
    }   
    const generateClick=async (donation)=>{
        await props.setGenerateData(donation);
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
                      <label htmlFor="filterDay" className="form-label">From</label>
                      <input    type="date" 
                                className="form-control" 
                                id="filterDay" 
                                name="filterDay"
                                value={fromDay}
                                onChange={(e)=>{setFromDay(e.target.value)}}
                        />
                    </div>
                    <div className="col-auto">
                      <label htmlFor="filterDay" className="form-label">To</label>
                      <input    type="date" 
                                className="form-control" 
                                id="filterDay" 
                                name="filterDay"
                                value={toDay}
                                onChange={(e)=>{setToDay(e.target.value)}}
                        />
                    </div>
                    
                  </form>
                }
                {
                    props.donations
                    .filter((data)=>{
                        
                        if(fromDay==="") return true;
                        const dataDate=new Date(data.createdAt.split("T")[0]);
                        const fromDate=new Date(fromDay);
                        const toDate=new Date(toDay);

                        return dataDate>=fromDate && dataDate<=toDate;
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
export default connect(mapStateToProps,{fetchDonations,setGenerateData})(Dashboard);