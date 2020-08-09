import React, { Component } from 'react';
import './reset.css';
import './App.css';

import firebase from './firebase.js';
// import InputField from './components/InputField';

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
        // formDetails: [
        //     {
        //         fieldId: 1,
        //         fieldLabel: "Please enter your company name",
        //         fieldCode: "company",
        //         fieldType: "text",
        //         fieldPlaceholder: "Company name"
        //     }
        // ],
        companyError: false,
        emailError: false,
        gdprError: false,
        imageryError: false,
        countriesError: false,
        certifiedInCountriesError: false,
        // errors: {},
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
    errorMessages = [
        {
            field: "company",
            message: "You need to fill in the name of the company you represent."
        },
        {
            field: "email",
            message: "You need to enter a valid email."
        },
        {
            field: "consentGDPR",
            message: "We need your consent to store the your data."
        },
        {
            field: "dataTypes",
            message: "You need to select at least one type imagery to supply."
        },
        {
            field: "countries",
            message: "You need to specify at least one country for which you can supply data."
        },
        {
            field: "isCertifiedInCOuntries",
            message: "We need to know that you're certified to fly and collect data in the countries you mentioned."
        }
    ]
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

        // this.formValidation();

        const submissionRef = firebase.database().ref('submissions');
        const entry = {
            company: this.state.company,
            email: this.state.email,
            dataTypesSupplied: this.state.typesOfData,
            countriesOfOperation: this.state.countries,
            consentGDPR: this.state.consentGDPR,
            isCertifiedInCountries: this.state.isCertifiedInCountries
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
    // formValidation() {
    //     var errorInstances = [];
    //     var errorCount = 0;
    //     if (this.state.company === "") {
    //         this.setState({
    //             companyError: true
    //         });
    //         errorCount ++;
    //         console.log(errorCount);
    //     }
    //     if (this.state.email === "") {
    //         this.setState({
    //             emailError: true
    //         });
    //         errorCount ++;
    //         console.log(errorCount);
    //     }
    //     if (!this.state.consentGDPR) {
    //         this.setState({
    //             gdprError: true
    //         });
    //         errorCount ++;
    //         console.log(errorCount);
    //     }
    //     if (this.state.typesOfData.length < 1) {
    //         this.setState({
    //             imageryError: true
    //         });
    //         errorCount ++;
    //         console.log(errorCount);
    //     }
    //     if (this.state.countries.length < 1) {
    //         this.setState({
    //             countriesError: true
    //         });
    //         errorCount ++;
    //         console.log(errorCount);
    //     }
    //     if (!this.state.isCertifiedInCountries) {
    //         this.setState({
    //             isCertifiedInCountriesError: true
    //         });
    //         errorCount ++;
    //         console.log(errorCount);
    //     }
    //     if (errorCount > 0) {
    //         this.setState({
    //             errors: errorInstances
    //         }, () => {
    //             console.log('validation test')
    //         });
    //     } else {
    //         const submissionRef = firebase.database().ref('submissions');
    //         const entry = {
    //             company: this.state.company,
    //             email: this.state.email,
    //             dataTypesSupplied: this.state.typesOfData,
    //             countriesOfOperation: this.state.countries,
    //             consentGDPR: this.state.consentGDPR,
    //             isCertifiedInCountries: this.state.isCertifiedInCountries
    //         }
    //         submissionRef.push(entry).then(() => {
    //             this.setState({
    //                 company: '',
    //                 email: ''
    //             });
    //         }).catch((error) => {
    //             alert('There has been an error with your submission. Please try again.')
    //         });
    //     }
    // }
    render() {
        let otherDataField, companyErrorMessage;
        if (this.state.showOtherInputField) {
            otherDataField = <div className="field-group">
                                <label for="otherDataType">Please specify other data formats you can supply</label>
                                <input id="otherDataType" onChange={this.handleTextChange.bind(this)} name="otherDataType" type="text" value={this.state.otherDataType} />
                                <button type="button" onClick={this.handleAddType.bind(this)}>Add your data type</button>
                            </div>;
        }
        // if (this.state.companyError) {
        //     companyErrorMessage = <p className="error-message">{this.errorMessages.company}</p>;
        // }
        return (
        <div className='app'>
            <header>
                
            </header>
            <h1>EarthBlox Challenge</h1>
            <div className=''>
                <section className="add-item">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        {/* <InputField handleTextChange={this.handleTextChange} fieldDetails={this.state.formDetails[0]} fieldValue={this.state.company} /> */}
                        <div className="field-group">
                            <label for="company">Please enter your company name</label>
                            <input id="company" onChange={this.handleTextChange.bind(this)} type="text" name="company" value={this.state.company} placeholder="Company name" />
                            {/* {companyErrorMessage} */}
                        </div>
                        <div className="field-group">
                            <label for="email">Please enter an email address</label>
                            <input id="email" onChange={this.handleTextChange.bind(this)} type="email" name="email" value={this.state.email} placeholder="Email" />
                        </div>
                        <div className="field-group">
                            <label for="consentGDPR">I consent to information being stored by Earth Blox</label>
                            <input type="checkbox" id="consentGDPR" name="consentGDPR" value="consentGDPR" onChange={this.handleConsentCheckbox.bind(this, "consentGDPR")} checked={this.state.consentGDPR} />
                        </div>
                        <fieldset className="field-group">
                            <legend>Which types of imagery can you supply</legend>
                            {this.state.dataTypes.map((type) => {
                                return (
                                    <div key={type.id}>
                                        <input onChange={this.handleCheckbox.bind(this, type.title, type.id)} type="checkbox" id={type.code} name="dataTypes" value={type.title} checked={type.isChecked} />
                                        <label for={type.code}>{type.title}</label>
                                    </div>
                                )
                            })}
                        </fieldset>
                        {otherDataField}
                        {this.state.otherTypes.map((data) => {
                            return (
                                <p>{data}</p>
                            )
                        })}
                        <div className="field-group
                        ">
                            <label for="country">Which geographic countries do you operate from?</label>
                            <input id="country" onChange={this.handleTextChange.bind(this)} name="country" type="text" value={this.state.country} />
                            <button type="button" onClick={this.handleAddCountry.bind(this)}>Add this country</button>
                        </div>
                        {this.state.countries.map((country) => {
                            return (
                                <p>{country}</p>
                            )
                        })}
                        <div className="field-group">
                            <label for="isCertifiedInCountries">I have all the necessary certification to fly and collect data in countries identified</label>
                            <input type="checkbox" id="isCertifiedInCountries" name="isCertifiedInCountries" onChange={this.handleConsentCheckbox.bind(this, "isCertifiedInCountries")} value="isCertifiedInCountries" checked={this.state.isCertifiedInCountries} />
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