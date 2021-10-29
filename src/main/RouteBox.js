import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import React,{useState,useEffect} from 'react';

//components
import DonateForm from "../components/DonateForm";
import LoginForm from "../components/LoginForm";
import Home from "../components/Home";
import MustExport from "../components/MustExport";

import { fetchDonations } from "../actions/donationActions";
import {connect} from 'react-redux';
import Dashboard from "../components/Dashboard";
import EditForm from "../components/EditForm";
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
        <Link to='/login'></Link>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/donate" render={(props)=><DonateForm data={data} setData={setData} />} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/edit" component={EditForm} />


      </Switch>
    </Router>
  );
}

const mapStateToProps=(state)=>({
  donations:state.donationList.donations,
  donation:state.donationList.donation
});
export default connect(mapStateToProps,{fetchDonations})(RouteBox)