import './App.css';
import "./cssmodules/dashboard.css";
import "./cssmodules/createLink.css";
import "./cssmodules/errorPage.css";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from "./components/dashboard";
import CreateLink from "./components/createLink";
import Nominate from "./components/nominate";
import ErrorPage from "./components/errorPage";

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
              <Route path='/nominate/:token' component={Nominate} />
              <Route path='/errorPage' component={ErrorPage} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
