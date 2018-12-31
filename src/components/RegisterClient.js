import React, { Component } from 'react';
import Loader from "./common/Loader";
import toastr from "toastr";
import {Requester} from "../api/requester";
import {FormGroup, Input, Label} from "reactstrap";
import DatePicker from "react-datepicker/es";
import moment from "moment";

class RegisterClient extends Component {

    constructor(props) {
        super(props);

        const endDate = new Date();
        endDate.setMonth(new Date().getMonth() + 1)

        this.state = {
            username: '',
            password: '',
            startDate: new Date(),
            endDate,
            loading: false
        };
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleRegister = e => {
        e.preventDefault();

        if (!this.state.password || !this.state.username || !this.state.startDate || !this.state.endDate) {
            toastr.error('All fields are required!');
            return;
        }

        this.setState({loading: true});
        Requester.registerClient(this.state.username, this.state.password, moment(this.state.startDate).format('DD/MM/YYYY'), moment(this.state.endDate).format('DD/MM/YYYY'))
            .then((res) => {
                const message = res.data.message;
                if (message !== 'success') {
                    toastr.error(message);
                } else {
                    toastr.success('Client ' + this.state.username + ' successfully registered!');
                    this.props.history.push('/clients/mine');
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
                <h4>Register Client</h4>
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
                    <h4>Card</h4>
                    <FormGroup>
                        <Label>Start Date</Label>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={date => this.setState({startDate: date})}
                            dateFormat='dd/MM/YYYY'
                        />
                        <br/>
                        <br/>
                        <Label>End Date</Label>
                        <DatePicker
                            selected={this.state.endDate}
                            onChange={date => this.setState({endDate: date})}
                            dateFormat='dd/MM/YYYY'
                        />
                    </FormGroup>
                    <button className="btn btn-primary" disabled={this.state.loading}>Register</button>
                </form>
            </div>
        );
    }
}

export default RegisterClient;
