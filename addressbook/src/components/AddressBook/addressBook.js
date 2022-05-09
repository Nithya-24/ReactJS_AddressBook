import React, {useEffect, useState} from "react";
import "./addressbook.css"
import cancel from "../../assets/cancel.jpeg";
import {Link, useParams} from "react-router-dom";
import addressBook from "../services/addressBook";

const AddressBook = (props) => {
       
    let initialValue = {
        fullName: '',
        address: '',
        city: 'Select City',
        state: 'Select State',
        phoneNumber: '',
        zipCode: '',
        isUpdate: false,
        // error: {
        //     nameError: ' ',
        //     address: ' ',
        //     city: ' ',
        //     state: ' ',
        //     phoneNumber: ' ',
        //     zipCode: ' '
        // }
    }

    let initialError = {
        fullName: '',
        address: '',
        city: '',
        state: '',
        phoneNumber: '',
        zipCode: '',
    }


    const [formValue, setForm] = useState(initialValue);
    const [formError, setFormError] = useState(initialError);
    const params = useParams();

    const validateData = () => {
        let error = formError;
        if (!formValue.fullName.match('^[A-Z]{1}[A-Za-z\\s]{2,}$')) {
            error.fullName = "Invalid NAME";
        }
        else {
            error.fullName = "✅";
        }

        if (!formValue.phoneNumber.match('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')) {
            error.phoneNumber = "Invalid PHONE NUMBER"
        }
        else {
            error.phoneNumber = "✅";
        }

        if (!formValue.address.match('^[a-zA-Z0-9#,&\\s]{4,}$')){
            error.address = "Invalid ADDRESS";
        }
        else {
            error.address = "✅";
        }

        if (!formValue.zipCode.match('^[0-9]{3}[0-9]{3}$')) {
            error.zipCode = "Invalid ZIP CODE";
        }
        else {
            error.zipCode = "✅";
        }

        setFormError(error);
    }

    useEffect(() => {
        
        validateData();
    }, [formValue]);


    const getContactByID = (id) => {
        addressBook.getContact(id).then((response) => {
            let obj = response.data;
            setData(obj);
        }).catch((error) => {
            alert(error);
        })
    }

    const setData = (obj) => {
        setForm({
            ...formValue,
            ...obj,
            isUpdate: true,
            fullName: obj.fullName,
            address: obj.address,
            city: obj.city,
            state: obj.state,
            phoneNumber: obj.phoneNumber,
            zipCode: obj.zipCode
        })
    }

    useEffect(() => {
        if (params.id) {
            getContactByID(params.id);
        }
    }, []);

    const changeValue = async (event) => {
        setForm({...formValue, [event.target.name]: event.target.value})
    }

    const save = (event) => {
        event.preventDefault();
        let object ={
            fullName:formValue.fullName,
            address: formValue.address,
            city: formValue.city,
            state: formValue.state,
            phoneNumber: formValue.phoneNumber,
            zipCode: formValue.zipCode,
        }
        if (formValue.isUpdate) {
            addressBook.updateContact(params.id, object).then((response) => {
                props.history.push('');
            }).catch((error) => {
                alert(error);
            })
        }
        else {
            addressBook.addAddressBook(object).then((response) => {
                props.history.push('');
            }).catch((error) => {
                alert(error);
            })
        }
    }

    const reset = () => {
        setForm({...initialValue, id: formValue.id, isUpdate: formValue.isUpdate});
    }

    return (
    <div className="form-content">
        <form action="#" className="form" onReset={() => reset()} onSubmit={save}>
            <div className="form-head">
                <div className="form-head-text">Person Address Form</div>
                <Link to ="/"><img className="form-head-image" src={cancel}
                alt="CancelButton" /></Link>
            </div>
      
            <div className="form-constrains">
                <div className="row-content">
                    <label htmlFor="name" className="label text name">Full Name</label>
                    <br/>
                    <input type="text" className="input" id="name" name="fullName" placeholder="Your name" autoComplete="off"
                     value={formValue.fullName} onChange={changeValue} required />
                    {formError.fullName && <div className="error">{formError.fullName}</div>}
                </div>
                <div className="row-content">
                    <label htmlFor="phoneNumber" className="label text">Phone Number</label>
                    <br/>
                    <input type="tel" className="input" id="phoneNumber" name="phoneNumber" placeholder="Your phone number"
                    autoComplete="off" value={formValue.phoneNumber} onChange={changeValue} required/>
                   {formError.phoneNumber && <div className="error">{formError.phoneNumber}</div>}
                </div>

                <div className="row-content">
                    <label htmlFor="address" className="label text address">Address</label>
                    <br/>
                    <textarea name="address" id="address" placeholder="Your address" autoComplete="off" value={formValue.address}
                     onChange={changeValue} required></textarea>
                     {formError.address && <div className="error">{formError.address}</div>}
                </div>
                <div className="row-content">
                    <div className="column-constrains">
                        <div className="column-content">
                            <label htmlFor="city" className="label text city">City</label>
                            <br/>
                            <select name="city" id="city" value={formValue.city} onChange={changeValue} required >
                                <option hidden defaultValue="Select City">Select City</option>
                                <option value="Ahmedabad">Ahmedabad</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Jaipur">Jaipur</option>
                                <option value="Kolkata">Kolkata</option>
                                <option value="Lucknow">Lucknow</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Pune">Pune</option>
                                <option value="Surat">Surat</option>
                            </select>
                        </div>

                        <div className="column-content">
                            <label htmlFor="state" className="label text city">State</label>
                            <br/>
                            <select name="state" id="state" value={formValue.state} onChange={changeValue}>
                                <option hidden defaultValue="Select State">Select State</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                <option value="Daman and Diu">Daman and Diu</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Lakshadweep">Lakshadweep</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Puducherry">Puducherry</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                            </select>
                        </div>

                        <div className="column-content">
                            <label htmlFor="zip" className="label text">Zipcode</label>
                            <br/>
                            <input type="text" className="input zipcode" id="zip" name="zipCode" autoComplete="off"
                             placeholder="Your zipcode" value={formValue.zipCode} onChange={changeValue} required />
                            {formError.zipCode && <div className="error">{formError.zipCode}</div>}
                        </div>
                    </div>
                </div>
                <div className="submitButton">
                    <button type="submit" className="button submitButton" id="submitButton" >{formValue.isUpdate ? 'update' : 'Submit'}</button>
                    <button type="reset" className="button resetButton" id="resetButton" onClick={() => reset()}>Reset</button>
                </div>
            </div>
        </form>
    </div>
    )
}

export default AddressBook;