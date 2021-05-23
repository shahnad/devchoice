import './App.css';
import "./cssmodules/dashboard.css";
import "./cssmodules/createLink.css";
import "./cssmodules/errorPage.css";
import "./cssmodules/nominate.css";
import "./cssmodules/login.css";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from "./components/dashboard";
import CreateLink from "./components/createLink";
import Nominate from "./components/nominate";
import Login from "./components/login";
import { ProtectedRoute } from "./components/protectedRoute";
import ErrorPage from "./components/errorPage";
import PageNotFound from "./components/pageNotFound";

function App() {
  return (
    <Router>
        <div>
          <Switch>
              <ProtectedRoute exact path='/dashboard' component={Dashboard} />
              <ProtectedRoute exact path='/createLink' component={CreateLink} />
              <Route exact path='/' component={Login} />
              <Route path='/nominate/:token' component={Nominate} />
              <Route path='/errorPage' component={ErrorPage} />
              <Route path='*' component={PageNotFound} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
