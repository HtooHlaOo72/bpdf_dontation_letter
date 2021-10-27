import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import React,{useState} from 'react';

//components
import DonateForm from "../components/DonateForm";
import LoginForm from "../components/LoginForm";
import Home from "../components/Home";
import MustExport from "../components/MustExport";



export default function RouteBox() {
  const [data,setData]=useState({
    name:'',
    amount:'',
    reason:'',
    responsibleBy:'',
});
  return (
    <Router>
        <Link to='/login'></Link>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/donate" render={(props)=><DonateForm data={data} setData={setData} />} />
        <Route exact path="/result">
          <MustExport {...data} />
        </Route>
      </Switch>
    </Router>
  );
}
