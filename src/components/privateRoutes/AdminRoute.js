import React from 'react'
import {Auth} from "../../api/auth";
import {Redirect, Route} from "react-router-dom";

export const AdminRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        Auth.isAdmin() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
        )
    )
    }/>
)
