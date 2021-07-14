import React, { Suspense }from 'react'
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import * as  UserService from '../../services/auth';
import Loader from '../../components/Loader';

const Auth = React.lazy(() => import('./index'));
const SignIn = React.lazy(() => import('./SignIn'));
const SignUp = React.lazy(() => import('./SignUp'));
const NotFound = React.lazy(() => import('../../components/NotFound'));
const ForgotPassword = React.lazy(() => import('./ForgotPassword'));

const AuthContainer = (props) => {
    
  return (
     <Suspense fallback={<Loader />}>
          <Auth {...props} >
            <Switch>
                <Route
                    exact
                    path={`${props.match.path}/login`}
                    render={() => <SignIn {...props} />} />
                <Route
                    exact
                    path={`${props.match.path}/signin`}
                    render={(props) => <SignUp {...props} />} />
                <Route
                    exact
                    path={`${props.match.path}/forgotPassword`}
                    render={(props) => <ForgotPassword {...props} />} />
                 <Route
                    exact
                    path={`${props.match.path}/*`}
                    render={(props) => <NotFound {...props}/>} />
          </Switch>
        </Auth>
      </Suspense>
     )
}
function mapStateToProps(state) {
  return {
    userdata: state?.auth,
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Object.assign({}, UserService), dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);