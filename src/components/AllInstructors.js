import React, { Component } from 'react';
import {Table} from "reactstrap";
import Loader from "./common/Loader";
import {Requester} from "../api/requester";

class AllInstructors extends Component {

    constructor(props) {
        super(props);

        this.state = {
            instructors: [],
            loading: false
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        Requester.fetchUsers()
            .then(res => {
                this.setState({
                    instructors: res.data.filter(user => user.roles.indexOf('INSTRUCTOR') !== -1),
                    loading: false
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                {this.state.loading ? <Loader/> : null}
                <h4>All Instructors</h4>
                <Table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.instructors.map(instructor => (
                        <tr>
                            <th scope="row">{instructor.id}</th>
                            <td>{instructor.username}</td>
                            <td><button className="btn btn-danger">Delete</button></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default AllInstructors;
