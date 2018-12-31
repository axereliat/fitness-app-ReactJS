import React, { Component } from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from "reactstrap";
import {Link} from "react-router-dom";
import {Auth} from "../../api/auth";

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logout = () => {
        Auth.logout();
    }

    render() {
        return (
            <div>
                <Navbar expand="md">
                    {/*<img src={require('../logo.png')} width="5%" alt="logo"/>*/}
                    <NavbarBrand>Fitness App</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link to="/" className="nav-link">Home</Link>
                            </NavItem>
                            {Auth.isAdmin() ? (
                                <NavItem>
                                    <Link to="/instructors/register" className="nav-link">Register Instructor</Link>
                                </NavItem>
                            ) : null}
                            {Auth.isAdmin() ? (
                                <NavItem>
                                    <Link to="/instructors/all" className="nav-link">All Instructors</Link>
                                </NavItem>
                            ) : null}
                            {Auth.isInstructor() ? (
                                <NavItem>
                                    <Link to="/clients/mine" className="nav-link">My Clients</Link>
                                </NavItem>
                            ) : null}
                            {Auth.isInstructor() ? (
                                <NavItem>
                                    <Link to="/clients/register" className="nav-link">Register Client</Link>
                                </NavItem>
                            ) : null}
                            {!Auth.isLoggedIn() ?
                                <NavItem>
                                    <Link to="/login" className="nav-link">Login</Link>
                                </NavItem>
                                : null}
                            {Auth.isLoggedIn() ? (
                                <NavItem>
                                    <Link to="/login" onClick={this.logout} className="nav-link">Logout</Link>
                                </NavItem>
                            ) : null}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;
