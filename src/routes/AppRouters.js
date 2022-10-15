
import {
    Switch,
    Route,

} from "react-router-dom";
import React from 'react';
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
import Role from '../components/Role/Role'
const AppRouters = (props) => {
    const Project = () => {

        return (
            <span> Project</span>
        )
    }
    return (
        <>
            <Switch>
                <PrivateRoutes path="/users" component={Users} />
                <PrivateRoutes path="/project" component={Project} />
                <PrivateRoutes path="/roles" component={Role} />


                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact>Home</Route>
                <Route path="*">404 not found</Route>
            </Switch>
        </>
    );
}

export default AppRouters;