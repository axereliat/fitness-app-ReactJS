import axios from 'axios';
import {Auth} from "./auth";

const baseUrl = 'https://fitness-instructor-app.herokuapp.com/';

export class Requester {

    static login(username, password) {
        return axios.post(baseUrl + 'login', {
            username,
            password
        });
    }

    static registerInstructor(username, password) {
        return axios.post(baseUrl + 'registerInstructor', {
            username,
            password
        }, {
            headers: {
                Authorization: 'Bearer ' + Auth.getToken()
            }
        });
    }

    static registerClient(username, password, startDate, endDate) {
        return axios.post(baseUrl + 'registerClient', {
            username,
            password,
            startDate,
            endDate
        }, {
            headers: {
                Authorization: 'Bearer ' + Auth.getToken()
            }
        });
    }

    static registerClient(username, password, startDate, endDate) {
        return axios.post(baseUrl + 'registerClient', {
            username,
            password,
            startDate,
            endDate
        }, {
            headers: {
                Authorization: 'Bearer ' + Auth.getToken()
            }
        });
    }

    static renewCard(startDate, endDate, userId) {
        return axios.post(baseUrl + 'addCard?userId=' + userId, {
            startDate,
            endDate
        }, {
            headers: {
                Authorization: 'Bearer ' + Auth.getToken()
            }
        });
    }

    static fetchUsers() {
        return axios.get(baseUrl + 'allUsers');
    }

    static fetchClientById(id) {
        return axios.get(baseUrl + 'client/' + id);
    }
}
