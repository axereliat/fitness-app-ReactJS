import React, { Component } from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import Loader from "./common/Loader";
import {Requester} from "../api/requester";
import {Auth} from "../api/auth";
import {FormGroup} from "reactstrap";
import {Label} from "reactstrap";
import toastr from "toastr";
import DatePicker from "react-datepicker";
import moment from "moment";
import {Link} from "react-router-dom";

class MyClients extends Component {

    constructor(props) {
        super(props);

        const endDate = new Date();
        endDate.setMonth(new Date().getMonth() + 1);

        this.state = {
            clients: [],
            modal: false,
            selectedId: '',
            selectedUsername: '',
            startDate: new Date(),
            endDate,
            loading: false
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        this.setState({loading: true});
        Requester.fetchUsers()
            .then(res => {
                this.setState({
                    clients: res.data.filter(user => user.roles.indexOf('CLIENT') !== -1 && user.registeredById == Auth.getUserId()),
                    loading: false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading: false
                });
            })
    }

    renewCard = e => {
        e.preventDefault();

        Requester.renewCard(moment(this.state.startDate).format('DD/MM/YYYY'), moment(this.state.endDate).format('DD/MM/YYYY'), this.state.selectedId)
            .then(() => {
                this.setState({clients: this.state.clients.map(client => {
                    if (client.id === this.state.selectedId) {
                        client.endDate = moment(this.state.endDate).format('DD/MM/YYYY');
                    }
                    return client;
                })});
                toastr.success('Card successfully renewed!');
                this.toggle();
            })
            .catch(err => {
                toastr.error('Error');
                console.log(err);
            })
    };

    render() {
        return (
            <div>
                {this.state.loading ? <Loader/> : null}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <h3>Renew {this.state.selectedUsername}'s card</h3>
                        <FormGroup>
                            <Label>Start Date</Label>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={date => this.setState({startDate: date})}/>
                            <br/>
                            <br/>
                            <Label>End Date</Label>
                            <DatePicker
                                selected={this.state.endDate}
                                onChange={date => this.setState({endDate: date})}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.renewCard}>Renew</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <h4>My Clients</h4>
                <Table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Expiration Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.clients.map(client => (
                        <tr key={client.id}>
                            <th scope="row">{client.id}</th>
                            <td>{client.username}</td>
                            <td>{client.cards[client.cards.length - 1].endDate}</td>
                            <td><Link className="btn btn-info text-white" to={"/clients/details/" + client.id}>Details</Link></td>
                            <td><button disabled={Date.parse(client.cards[client.cards.length - 1].endDate) > (new Date()).getTime()}
                                        className="btn btn-primary"
                                        onClick={() => this.setState({modal: true, selectedId: client.id, selectedUsername: client.username})}>
                                Renew Card
                            </button></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default MyClients;
