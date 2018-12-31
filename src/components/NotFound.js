import React, { Component } from 'react';
import {Link} from "react-router-dom";

class NotFound extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h1 className="text-center">404 Not Found</h1>
                <h3 className="text-center">The resource you are looking for could not be found.</h3>
                <h3 className="text-center">Go to <Link to="/">home page</Link></h3>
            </div>
        );
    }
}

export default NotFound;
