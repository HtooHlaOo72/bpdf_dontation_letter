import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

import DonateForm from "../components/DonateForm";
import LoginForm from "../components/LoginForm";
import Home from "../components/Home";

export default function RouteBox() {
  return (
    <Router>
        <Link to='/login'></Link>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/donate" component={DonateForm} />
      </Switch>
    </Router>
  );
}
