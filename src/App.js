import React, { Component } from 'react';
import './App.css';

import firebase from './firebase.js';
import TextInput from './components/TextInput';

class App extends Component {
    state = {
        company: '',
        email: '',
        showOtherInputField: false,
        formDetails: [
            {
                fieldId: 1,
                fieldLabel: "Please enter your company name",
                fieldCode: "company",
                fieldType: "text",
                fieldPlaceholder: "Company name"
            }
        ]
    }
    handleOtherCheckbox() {
        this.setState({
            showOtherInputField: !this.state.showOtherInputField
        });
    }
    handleTextChange(e) {
        console.log('hello', e.target.name, e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const submissionRef = firebase.database().ref('submissions');
        const entry = {
            company: this.state.company,
            email: this.state.email
        }
        submissionRef.push(entry).then(() => {
            this.setState({
                company: '',
                email: ''
            });
        }).catch((error) => {
            alert('There has been an error with your submission. Please try again.')
        });
    }
    render() {
        const dataTypes = ["Geotagged photos", "Drone photography", "Ground control points", "Drone video, Drone Lidar", "Drone radar", "Aerial video", "Aerial radar", "Stereo photo", "Aerial Lidar", "Air photo", "Other"];
        let otherDataField;
        if (this.state.showOtherInputField) {
            otherDataField = <div>
                                <label for="otherDataType">Please specify other data formats you can supply</label>
                                <input id="otherDataType" name="otherDataType" type="text" />
                            </div>;
        }
        return (
        <div className='app'>
            <header>
                <h1>EarthBlox Challenge</h1>
            </header>
            <div className=''>
                <section className="add-item">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <TextInput handleTextChange={this.handleTextChange} fieldDetails={this.state.formDetails[0]} fieldValue={this.state.company} />
                        {/* <label for="company">Please enter your company name</label>
                        <input id="company" onChange={this.handleTextChange.bind(this)} type="text" name="company" value={this.state.company} placeholder="Company name" /> */}
                        <label for="email">Please enter an email address</label>
                        <input id="email" onChange={this.handleTextChange.bind(this)} type="email" name="email" value={this.state.email} placeholder="Email" />
                        <label for="consentGDPR">I consent to information being stored by Earth Blox</label>
                        <input type="checkbox" id="consentGDPR" name="consentGDPR" />
                        <fieldset>
                            <legend>Which types of imagery can you supply</legend>
                            {dataTypes.map((type) => {
                                const typeCode = type.split(" ").join("-").toLowerCase();
                                return (
                                    <div>
                                        <input onChange={this.handleOtherCheckbox.bind(this)} type="checkbox" id={typeCode} name="dataTypes" value={type} />
                                        <label for={typeCode}>{type}</label>
                                    </div>
                                )
                            })}
                        </fieldset>
                        {otherDataField}
                        <label for="certifiedData">I have all the necessary certification to fly and collect data in countries identified</label>
                        <input type="checkbox" id="certifiedData" name="certifiedData" />
                        <button type="submit">Submit</button>
                    </form>
                </section>
            </div>
        </div>
        );
    }
}
export default App;