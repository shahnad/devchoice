import './App.css';
import "./cssmodules/dashboard.css";
import "./cssmodules/createLink.css";
import "./cssmodules/errorPage.css";
import "./cssmodules/nominate.css";
import "./cssmodules/login.css";
import "./cssmodules/nominationList.css";
import "./cssmodules/managenominees.css";
import "./cssmodules/nomineeperson.css";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from "./components/dashboard";
import CreateLink from "./components/createLink";
import Nominate from "./components/nominate";
import NominatePerson from "./components/nominatePerson";
import Login from "./components/login";
import NominationList from "./components/nominationList";
import ManageNominees from "./components/manageNominees";
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
              <ProtectedRoute exact path='/nominationList' component={NominationList} />
              <ProtectedRoute exact path='/manageNominees' component={ManageNominees} />
              <Route exact path='/' component={Login} />
              <Route path='/nominate/:token' component={Nominate} />
              <Route path='/nominatePerson' component={NominatePerson} />
              <Route path='/errorPage/' component={ErrorPage} />
              <Route path='*' component={PageNotFound} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
