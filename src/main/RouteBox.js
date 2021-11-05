import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import React,{useState,useEffect} from 'react';

//components
import DonateForm from "../components/DonateForm";
import LoginForm from "../components/LoginForm";
import Home from "../components/Home";

import { fetchDonations } from "../actions/donationActions";
import {connect} from 'react-redux';
import Dashboard from "../components/Dashboard";
import EditForm from "../components/EditForm";
import Paper from "../components/Paper";
import NoMatch from "../components/NoMatch";
import Detail from "../components/Detail";
import RecordDisplay from "../components/RecordDisplay";
function RouteBox(props) {
  const [data,setData]=useState({
    name:'',
    amount:'',
    reason:'',
    responsibleBy:'',
});
  useEffect(()=>{
    // props.fetchDonations();
  },[])
  return (
    <Router>
      <div className='container'>
        <div className='row'>
          <header className='col-12 py-3 home-header mb-2'>
            <Link to='/' className='nav-header' >
              <h1 className=''>Donation to Bago PDF</h1>
            </Link>
          </header>
        </div>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/donate" render={(props)=><DonateForm data={data} setData={setData} />} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/export" component={Paper} />
        <Route exact path="/edit" component={EditForm} />
        <Route exact path="/detail" component={Detail} />
        <Route exact path="/records" component={RecordDisplay} />
        <Route exact path="*" component={NoMatch} />
      </Switch>
      
    </Router>
  );
}

const mapStateToProps=(state)=>({
  donations:state.donationList.donations,
  donation:state.donationList.donation
});
export default connect(mapStateToProps,{fetchDonations})(RouteBox)