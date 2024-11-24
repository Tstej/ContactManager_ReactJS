import axios from 'axios';

export class ContactService{

    static getGroups(){
        let dataURL = `http://localhost:9000/groups`;
        return axios.get(dataURL);
    }

    static getGroup(contact){
        let group = contact.group;
        let dataURL = `http://localhost:9000/groups/${group}`;
        return axios.get(dataURL);
    }


    static getAllContacts(){
        let dataURL = `http://localhost:9000/contacts`;
        return axios.get(dataURL);
    }

    static getSingleContact(contactId){
        let dataURL = `http://localhost:9000/contacts/${contactId}`;
        return axios.get(dataURL);
    }

    static createContact(contact){
        let dataURL = `http://localhost:9000/contacts`;
        return axios.post(dataURL, contact);
    }

    static updateContact(contact, contactId){
        let dataURL = `http://localhost:9000/contacts/${contactId}`;
        return axios.put(dataURL, contact);
    }

    static deleteContact(contactId){
        let dataURL = `http://localhost:9000/contacts/${contactId}`;
        return axios.delete(dataURL);
    }



}