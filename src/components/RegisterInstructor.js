import React, { Component } from 'react';
import Loader from "./common/Loader";
import toastr from "toastr";
import {Requester} from "../api/requester";
import {FormGroup, Input, Label} from "reactstrap";

class RegisterInstructor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loading: false
        };
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleRegister = e => {
        e.preventDefault();

        if (!this.state.password || !this.state.username) {
            toastr.error('All fields are required!');
            return;
        }

        this.setState({loading: true});
        Requester.registerInstructor(this.state.username, this.state.password)
            .then((res) => {
                const message = res.data.message;
                if (message !== 'success') {
                    toastr.error(message);
                } else {
                    toastr.success('Instructor ' + this.state.username + ' successfully registered!');
                    this.props.history.push('/instructors/all');
                }
                this.setState({
                    loading: false,
                    password: ''
                });
            })
            .catch(err => {
                console.log(err);
                toastr.error('Error');
                this.setState({
                    loading: false,
                    password: ''
                });
            });
    };

    render() {
        return (
            <div>
                {this.state.loading ? <Loader/> : null}
                <h4>Register Instructor</h4>
                <form onSubmit={this.handleRegister}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text"
                               name="username"
                               id="username"
                               placeholder="Enter your username"
                               onChange={this.handleChange}
                               value={this.state.email}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password"
                               name="password"
                               id="password"
                               placeholder="Enter your password"
                               onChange={this.handleChange}
                               value={this.state.password}/>
                    </FormGroup>
                    <button className="btn btn-primary" disabled={this.state.loading}>Register</button>
                </form>
            </div>
        );
    }
}

export default RegisterInstructor;
