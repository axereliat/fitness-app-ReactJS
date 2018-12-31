import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from "reactstrap";
import {Requester} from "../api/requester";
import toastr from "toastr";
import Loader from "./common/Loader";
import {Link} from "react-router-dom";

class ClientDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            client: null,
            loading: false
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        Requester.fetchClientById(this.props.match.params.id)
            .then(res => {
                this.setState({client: res.data, loading: false});
            })
            .catch(err => {
                this.setState({loading: false});
                console.log(err);
                toastr.error('Error');
            });
    }

    render() {
        return (
            <div>
                {this.state.loading ? <Loader/> : null}
                {this.state.client ? (
                    <div>
                        <h2>{this.state.client.username}</h2>
                        <h3>Cards</h3>
                        <ListGroup>
                            {this.state.client.cards.map(card => (
                                <ListGroupItem style={Date.parse(card.endDate) < (new Date()).getTime() ? {backgroundColor: '#FC947E'} : null}>
                                    Start Date: {card.startDate}, End Date: {card.endDate} {Date.parse(card.endDate) < (new Date()).getTime() ? <strong>Expired</strong> : null}
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                        <br/>
                        <Link to="/" className="btn btn-secondary">Back</Link>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default ClientDetails;
