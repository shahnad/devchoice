import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { useSelector } from 'react-redux'
import AuthContainer from "../../container/auth/AuthContainer";
import AdminContainer from "../../container/dashboard/AdminContainer";
import NoPageFound from "../NotFound";

export default function CommonRoute(props) {
   const auth = useSelector(state => state.auth.authenticated)
  return (
      <Router>
         <Switch>
            <Route exact path="/">
               {auth ?
               <Redirect to="/dashboard" />:
                   <Redirect to="/auth/login" />}
            </Route>
            <Route
               path="/auth"
               render={(props) => {
                  return <AuthContainer {...props} />;
               }}
            />
            <Route
               path="/dashboard"
               render={(props) => {
                  return auth ? <AdminContainer {...props} /> : <Redirect to="/auth/login" />;
               }}
            />
            <Route exact path="*" render={() => <NoPageFound />} />
         </Switch>
      </Router>
   );
}
