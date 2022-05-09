import React, { useEffect, useState } from "react";
import './dashboard.css';
import { Link } from "react-router-dom";
import Contact from "./contact";
import addressBook from "../services/addressBook";


function Dashboard() {

    const [contactArray, setContact] = useState([]);

    useEffect(() => {
        getAllContacts();
    }, []);

    const getAllContacts = () => {
        addressBook.getAllContact().then((response) => {
            const allContacts = response.data;
            setContact(allContacts);
        }).catch((error) => {
            alert(error);
        })
    }

    return (
        <>
           
            <div className="main-content">
                <div className="header-content person-header">
                    <div className="person-detail-text">
                        Person Details
                        <div className="person-count">{contactArray.length}</div>
                    </div>
                    <Link to="/form" className="add-button">
                        <div> + Add Person </div>
                    </Link>
                </div>
                <div className="table-main">

                    <Contact contactArray = {contactArray}/>

                    {/* <table id="table-display" className="table">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip Code</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Nithya</td>
                            <td>Satchiyapuram Road</td>
                            <td>Virudhunagar</td>
                            <td>TamilNadu</td>
                            <td>626130</td>
                            <td>3214567490</td>
                            <td>
                                <img src={edit_btn} alt="edit"  onClick={update(this)}/>
                                <img src={delete_btn} alt="delete" onClick={remove(this)}/>
                            </td>
                        </tr>
                        </tbody>
                    </table> */}
                </div>
            </div>
        </>
    );
}
export default Dashboard;