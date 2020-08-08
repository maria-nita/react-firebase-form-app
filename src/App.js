import React, { Component } from 'react';
import './reset.css';
import './App.css';

import firebase from './firebase.js';
// import InputField from './components/InputField';

class App extends Component {
    state = {
        company: '',
        email: '',
        otherDataType: '',
        otherData: [],
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
    handleOtherCheckbox(value) {
        if (value === 'Other') {
            this.setState({
                showOtherInputField: !this.state.showOtherInputField
            });
        }
    }
    handleTextChange(e) {
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
    handleAddType(e) {
        const newDataType = this.state.otherDataType;
        this.setState({
            otherData: [...this.state.otherData, newDataType],
            otherDataType: ''
        });
    }
    render() {
        const dataTypes = ["Geotagged photos", "Drone photography", "Ground control points", "Drone video, Drone Lidar", "Drone radar", "Aerial video", "Aerial radar", "Stereo photo", "Aerial Lidar", "Air photo", "Other"];
        let otherDataField;
        if (this.state.showOtherInputField) {
            otherDataField = <div className="field-group">
                                <label for="otherDataType">Please specify other data formats you can supply</label>
                                <input id="otherDataType" onChange={this.handleTextChange.bind(this)} name="otherDataType" type="text" value={this.state.otherDataType} />
                                <button type="button" onClick={this.handleAddType.bind(this)}>Add your data type</button>
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
                        {/* <InputField handleTextChange={this.handleTextChange} fieldDetails={this.state.formDetails[0]} fieldValue={this.state.company} /> */}
                        <div className="field-group">
                            <label for="company">Please enter your company name</label>
                            <input id="company" onChange={this.handleTextChange.bind(this)} type="text" name="company" value={this.state.company} placeholder="Company name" />
                        </div>
                        <div className="field-group">
                            <label for="email">Please enter an email address</label>
                            <input id="email" onChange={this.handleTextChange.bind(this)} type="email" name="email" value={this.state.email} placeholder="Email" />
                        </div>
                        <div className="field-group">
                            <label for="consentGDPR">I consent to information being stored by Earth Blox</label>
                            <input type="checkbox" id="consentGDPR" name="consentGDPR" />
                        </div>
                        <fieldset className="field-group">
                            <legend>Which types of imagery can you supply</legend>
                            {dataTypes.map((type) => {
                                const typeCode = type.split(" ").join("-").toLowerCase();
                                return (
                                    <div>
                                        <input onChange={this.handleOtherCheckbox.bind(this, type)} type="checkbox" id={typeCode} name="dataTypes" value={type} />
                                        <label for={typeCode}>{type}</label>
                                    </div>
                                )
                            })}
                        </fieldset>
                        {otherDataField}
                        {this.state.otherData.map((data) => {
                            return (
                                <p>{data}</p>
                            )
                        })}
                        <div className="field-group">
                            <label for="certifiedData">I have all the necessary certification to fly and collect data in countries identified</label>
                            <input type="checkbox" id="certifiedData" name="certifiedData" />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </section>
            </div>
        </div>
        );
    }
}
export default App;