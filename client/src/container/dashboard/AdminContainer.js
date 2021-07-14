import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect,useSelector } from "react-redux";
import { bindActionCreators } from 'redux'
import * as  UserService from '../../services/user';
import Loader from '../../components/Loader';

const Dashboard = React.lazy(() => import('../dashboard/components'));
const DashboardPage = React.lazy(() => import('../dashboard/components/dashboardPage'));
const HubLists = React.lazy(() => import('../dashboard/components/HubList'));
const UsersList = React.lazy(() => import('../dashboard/components/users'));
const OrderList = React.lazy(() => import('../dashboard/components/order'));
const NotFound = React.lazy(() => import('../../components/NotFound'));
const MoreNotifications = React.lazy(() => import('./components/Notification/MoreNotification'));
const MoreMessages = React.lazy(() => import('../../components/Messages/MoreMessages'));

const AdminContainer = (props) => {
  const auth = useSelector(state => state.auth.authenticated)
  return (
   <Suspense fallback={<Loader />}>
    <Dashboard>
      <Switch>
        <Route
          exact
          path={`${props.match.path}`}
          render={() => auth?<DashboardPage {...props} />:''}
        />
        <Route
          exact
          path={`${props.match.path}/hubs`}
          render={() => { return <HubLists {...props} /> }}
        />
        <Route
          exact
          path={`${props.match.path}/users`}
          render={() => <UsersList {...props} />}
        />
        <Route
          exact
          path={`${props.match.path}/orders`}
          render={() => <OrderList {...props} />}
        />
        <Route
          exact
          path={`${props.match.path}/notifications`}
          render={() => <MoreNotifications {...props} />}
        />
          <Route
          exact
          path={`${props.match.path}/messages`}
          render={() => <MoreMessages {...props} />}
        />
        <Route
          exact
          path={`${props.match.path}/*`}
          render={() => <NotFound {...props} />} />
        

      </Switch>
      </Dashboard>
      </Suspense>
  )
}

function mapStateToProps(state) {

  return {
    userauth: state?.auth,
    users: state?.users

  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Object.assign({}, UserService), dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);
