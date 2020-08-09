import React, { Component } from 'react';
import './reset.css';
import './App.css';

import firebase from './firebase.js';
// import InputField from './components/InputField';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

class App extends Component {
    state = {
        company: '',
        email: '',
        country: '',
        countries: [],
        otherDataType: '',
        typesOfData: [],
        consentGDPR: false,
        isCertifiedInCountries: false,
        otherTypes: [],
        showOtherInputField: false,
        successMessage: null,
        // formDetails: [
        //     {
        //         fieldId: 1,
        //         fieldLabel: "Please enter your company name",
        //         fieldCode: "company",
        //         fieldType: "text",
        //         fieldPlaceholder: "Company name"
        //     }
        // ],
        gdprError: false,
        certifiedInCountriesError: false,
        dataTypes: [
            {
                id: 1,
                title: "Geotagged photos",
                code: "geotagged-photos",
                isChecked: false
            },
            {
                id: 2,
                title: "Drone photography",
                code: "drone-photography",
                isChecked: false
            },
            {
                id: 3,
                title: "Ground control points",
                code: "ground-control-points",
                isChecked: false
            },
            {
                id: 4,
                title: "Drone video",
                code: "drone-video",
                isChecked: false
            },
            {
                id: 5,
                title: "Drone Lidar",
                code: "drone-lidar",
                isChecked: false
            },
            {
                id: 6,
                title: "Drone radar",
                code: "drone-radar",
                isChecked: false
            },
            {
                id: 7,
                title: "Aerial video",
                code: "aerial-video",
                isChecked: false
            },
            {
                id: 8,
                title: "Aerial radar",
                code: "aerial-radar",
                isChecked: false
            },
            {
                id: 9,
                title: "Stereo photo",
                code: "stereo-photo",
                isChecked: false
            },
            {
                id: 10,
                title: "Aerial Lidar",
                code: "aerial-lidar",
                isChecked: false
            },
            {
                id: 11,
                title: "Air photo",
                code: "air-photo",
                isChecked: false
            },
            {
                id: 12,
                title: "Other",
                code: "other",
                isChecked: false
            }
        ]
    }
    handleCheckbox(value, id) {
        if (value === 'Other') {
            this.setState({
                showOtherInputField: !this.state.showOtherInputField
            });
        } else {
            this.setState({
                typesOfData: [...this.state.typesOfData, value]
            });
        }
        this.setState({
            dataTypes: this.state.dataTypes.map(
                dataType => {
                    if (dataType.id === id) {
                        dataType.isChecked = !dataType.isChecked
                    }
                    return dataType;
                }
            )
        });
    }
    handleTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleAddType() {
        const newDataType = this.state.otherDataType;
        this.setState({
            typesOfData: [...this.state.typesOfData, newDataType],
            otherTypes: [...this.state.otherTypes, newDataType],
            otherDataType: ''
        });
    }
    handleAddCountry() {
        const newCountry = this.state.country;
        this.setState({
            countries: [...this.state.countries, newCountry],
            country: ''
        });
    }
    handleConsentCheckbox(value) {
        if (value === "consentGDPR") {
            this.setState({
                consentGDPR: !this.state.consentGDPR
            });
        } else if (value === "isCertifiedInCountries") {
            this.setState({
                isCertifiedInCountries: !this.state.isCertifiedInCountries
            });
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        let dataConsent = this.state.consentGDPR;
        let certificationConsent = this.state.isCertifiedInCountries;

        const submissionRef = firebase.database().ref('submissions');
        const entry = {
            company: this.state.company,
            email: this.state.email,
            dataTypesSupplied: this.state.typesOfData,
            countriesOfOperation: this.state.countries,
            consentGDPR: this.state.consentGDPR,
            isCertifiedInCountries: this.state.isCertifiedInCountries
        }
        if (dataConsent === true && certificationConsent === true) {
            submissionRef.push(entry).then(() => {
                var resetDataTypes = [];
                resetDataTypes = this.state.dataTypes.map(dataType => {
                    dataType.isChecked = false;
                    return dataType;
                });
                this.setState({
                    company: '',
                    email: '',
                    countries: [],
                    otherTypes: [],
                    consentGDPR: false,
                    isCertifiedInCountries: false,
                    gdprError: false,
                    certifiedInCountriesError: false,
                    successMessage: true,
                    dataTypes: resetDataTypes
                });
            }).catch((error) => {
                this.setState({ 
                    successMessage: false
                });
            });
        } else {
            this.setState({
                gdprError: true,
                certifiedInCountriesError: true,
                successMessage: null
            })
        }
    }
    render() {
        let otherDataField, successMessage, gdprErrorMessage, certificationErrorMessage;
        if (this.state.showOtherInputField) {
            otherDataField = <div className="field-group">
                                <label htmlFor="otherDataType">Please specify other data formats you can supply</label>
                                <input id="otherDataType" onChange={this.handleTextChange.bind(this)} name="otherDataType" type="text" value={this.state.otherDataType} />
                                <button type="button" onClick={this.handleAddType.bind(this)}>Add your data type</button>
                            </div>;
        }
        if (this.state.successMessage === true) {
            successMessage = <div className="success-message">
                                <p> Thank you, your submission has been registered.</p>
                            </div>;
        } else if (this.state.successMessage === false) {
            successMessage = <div className="success-message">
                                <p>There has been an error with your submission. Please try again.</p>
                            </div>;
        }
        if (this.state.gdprError === true) {
            gdprErrorMessage = <div className="error-message">
                                <p>We need your consent to store your data.</p>
                            </div>;
        }
        if (this.state.certifiedInCountriesError === true) {
            certificationErrorMessage = <div className="error-message">
                                        <p>We need to confirm that you're certified to fly and collect data in the countries you mentioned.</p>
                                    </div>;
        }
        return (
        <div className='App'>
            <header>
                <Header />
            </header>
            <div className="image-section">
                <div className="container">
                    <div className="title-wrapper">
                        <h1>Earth Data Submission</h1>
                    </div>
                    <div className="form-wrapper">
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            {/* <InputField handleTextChange={this.handleTextChange} fieldDetails={this.state.formDetails[0]} fieldValue={this.state.company} /> */}
                            <div className="field-group">
                                <label className="field-label" htmlFor="company">Please enter your company name</label>
                                <input id="company" onChange={this.handleTextChange.bind(this)} type="text" name="company" value={this.state.company} placeholder="Company name" />
                                {/* {companyErrorMessage} */}
                            </div>
                            <div className="field-group">
                                <label className="field-label" htmlFor="email">Please enter an email address</label>
                                <input id="email" onChange={this.handleTextChange.bind(this)} type="email" name="email" value={this.state.email} placeholder="Email" />
                            </div>
                            <div className="field-group-consent">
                                <label htmlFor="consentGDPR">I consent to information being stored by Earth Blox</label>
                                <input type="checkbox" id="consentGDPR" name="consentGDPR" value="consentGDPR" onChange={this.handleConsentCheckbox.bind(this, "consentGDPR")} checked={this.state.consentGDPR} />
                            </div>
                            {gdprErrorMessage}
                            <fieldset className="field-group">
                                <legend className="field-label">Which types of imagery can you supply</legend>
                                {this.state.dataTypes.map((type) => {
                                    return (
                                        <div key={type.id}>
                                            <input onChange={this.handleCheckbox.bind(this, type.title, type.id)} type="checkbox" id={type.code} name="dataTypes" value={type.title} checked={type.isChecked} />
                                            <label className="checkbox-label" htmlFor={type.code}>{type.title}</label>
                                        </div>
                                    )
                                })}
                            </fieldset>
                            {otherDataField}
                            {this.state.otherTypes.map((data) => {
                                return (
                                    <p className="dynamic-text">{data}</p>
                                )
                            })}
                            <div className="field-group
                            ">
                                <label className="field-label" htmlFor="country">Which geographic countries do you operate from?</label>
                                <input id="country" onChange={this.handleTextChange.bind(this)} name="country" type="text" value={this.state.country} />
                                <button type="button" onClick={this.handleAddCountry.bind(this)}>Add this country</button>
                            </div>
                            {this.state.countries.map((country) => {
                                return (
                                    <p className="dynamic-text">{country}</p>
                                )
                            })}
                            <div className="field-group-consent">
                                <label htmlFor="isCertifiedInCountries">I have all the necessary certification to fly and collect data in countries identified</label>
                                <input type="checkbox" id="isCertifiedInCountries" name="isCertifiedInCountries" onChange={this.handleConsentCheckbox.bind(this, "isCertifiedInCountries")} value="isCertifiedInCountries" checked={this.state.isCertifiedInCountries} />
                            </div>
                            {certificationErrorMessage}
                            <button className="form-submit" type="submit">Submit</button>
                        </form>
                        {successMessage}
                    </div>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
        );
    }
}
export default App;