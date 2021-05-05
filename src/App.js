import './App.css';
import "./cssmodules/dashboard.css";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from "./components/dashboard";

function App() {
  return (
    <Router>
        <div>
          <div className="navbar-nav mr-auto">
            <a><Link to={'/'} className="nav-link"> <b>Dashboard</b> </Link></a>
          </div>
          <Switch>
              <Route exact path='/' component={Dashboard} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
