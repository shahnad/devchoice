import './App.css';
import "./cssmodules/dashboard.css";
import "./cssmodules/createLink.css";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from "./components/dashboard";
import CreateLink from "./components/createLink";
import Nominate from "./components/nominate";

function App() {
  return (
    <Router>
        <div>
          <div className="navbar-nav">
            <a><Link to={'/'} className="nav-link"> <b>Dashboard</b> </Link></a>
            <a><Link to={'/createLink'} className="nav-link"> <b>Create Link</b> </Link></a>
          </div>
          <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route exact path='/createLink' component={CreateLink} />
              <Route exact path='/nominate' component={Nominate} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
