import config from "../Config/config";

// const axios = require('axios').default;
import axios from "axios";

class AddressBook {
    baseURL = config.baseUrl;
    addAddressBook = (data) => {
        return axios.post(`${this.baseURL}addressbook`, data);
    }

    getAllContact = () => {
        return axios.get(`${this.baseURL}addressbook`);
    }

    deleteContact = (id) => {
        return axios.delete(`${this.baseURL}addressBook/${id}`);
    }

    getContact(id) {
        return axios.get(`${this.baseURL}addressBook/${id}`);
    }

    updateContact(id,data) {
        return axios.put(`${this.baseURL}addressBook/${id}`, data);
    }
}
export default new AddressBook();
