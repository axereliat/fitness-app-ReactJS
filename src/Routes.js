import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import {AdminRoute} from "./components/privateRoutes/AdminRoute";
import RegisterInstructor from "./components/RegisterInstructor";
import {InstructorRoute} from "./components/privateRoutes/InstructorRoute";
import RegisterClient from "./components/RegisterClient";
import AllInstructors from "./components/AllInstructors";
import MyClients from "./components/MyClients";
import Home from "./components/Home";
import ClientDetails from "./components/ClientDetails";

const Routes = () => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <AdminRoute path='/instructors/register' component={RegisterInstructor}/>
        <AdminRoute path='/instructors/all' component={AllInstructors}/>
        <InstructorRoute path='/clients/register' component={RegisterClient}/>
        <InstructorRoute path='/clients/mine' component={MyClients}/>
        <InstructorRoute path='/clients/details/:id' component={ClientDetails}/>
        <Route exact path='/' component={Home}/>
        <Route component={NotFound}/>
    </Switch>
);

export default Routes;
