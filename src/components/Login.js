import React, {Component} from 'react';
import {FormGroup, Input, Label} from "reactstrap";
import {Requester} from "../api/requester";
import toastr from 'toastr';
import {Auth} from "../api/auth";
import Loader from './common/Loader';

class Login extends Component {

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

    handleLogin = e => {
        e.preventDefault();

        if (!this.state.password || !this.state.username) {
            toastr.error('All fields are required!');
            return;
        }

        this.setState({loading: true});
        Requester.login(this.state.username, this.state.password)
            .then(res => {
                Auth.saveData(res.data);
                toastr.success('You are now logged in!');
                this.props.history.push('/');
                this.setState({loading: false});
            })
            .catch(err => {
                toastr.error('Invalid credentials.');
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
                <h4>Log in</h4>
                <form onSubmit={this.handleLogin}>
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
                    <button className="btn btn-primary" disabled={this.state.loading}>Login</button>
                </form>
            </div>
        );
    }
}

export default Login;
