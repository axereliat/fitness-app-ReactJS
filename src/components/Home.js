import React, { Component } from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import Loader from "./common/Loader";
import {Requester} from "../api/requester";
import {Auth} from "../api/auth";
import {FormGroup} from "reactstrap";
import {Label} from "reactstrap";
import {Input} from "reactstrap";
import toastr from "toastr";
import DatePicker from "react-datepicker";
import moment from "moment";
import {Link} from "react-router-dom";

class Home extends Component {

    constructor(props) {
        super(props);

        const endDate = new Date();
        endDate.setMonth(new Date().getMonth() + 1);

        this.state = {
            clients: [],
            filteredClients: [],
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
                    clients: res.data.filter(user => user.roles.indexOf('CLIENT') !== -1),
                    filteredClients: res.data.filter(user => user.roles.indexOf('CLIENT') !== -1),
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

    filterClients = value => {
        this.setState({
            filteredClients: this.state.clients.filter(client => client.username.toLowerCase().indexOf(value.toLowerCase()) !== -1)
        });
    };

    render() {
        return (
            <div>
                {this.state.loading ? <Loader/> : null}
                <h2 className="text-center">Hello, {Auth.getUsername()}</h2>
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
                <h4>All Clients</h4>
                <br/>
                <Input type="text"
                       name="search"
                       id="search"
                       placeholder="Search for username"
                       style={{width: '30%'}}
                       onChange={e => this.filterClients(e.target.value)}
                       value={this.state.search}/>
                <Table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Expiration Date</th>
                        {Auth.isInstructor() ? <th>Actions</th> : null}
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.filteredClients.map(client => (
                        <tr key={client.id} style={Auth.getUserId() == client.id ? {backgroundColor: '#70ff17'} : null}>
                            <th scope="row">{client.id}</th>
                            <td>{client.username}</td>
                            <td>{client.cards[client.cards.length - 1].endDate}</td>
                            {Auth.isInstructor() ?
                                <td><Link className="btn btn-info text-white" to={"/clients/details/" + client.id}>Details</Link></td>
                                : null}
                            {Auth.isInstructor() ?
                                <td><button disabled={Date.parse(client.cards[client.cards.length - 1].endDate) > (new Date()).getTime()}
                                            className="btn btn-primary"
                                            onClick={() => this.setState({modal: true, selectedId: client.id, selectedUsername: client.username})}>
                                    Renew Card
                                </button></td>
                                : null}
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Home;
