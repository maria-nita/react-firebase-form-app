import React, { Component } from 'react';
import './App.css';

import firebase from './firebase.js';


class App extends Component {
    state = {
        company: '',
        email: ''
    }
    handleChange(e) {
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
        submissionRef.push(entry);
        this.setState({
            company: '',
            email: ''
        });
    }
    render() {
        return (
        <div className='app'>
            <header>
                <h1>EarthBlox Challenge</h1>
            </header>
            <div className=''>
                <section className="add-item">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <label for="company">Please enter your company name</label>
                        <input onChange={this.handleChange.bind(this)} type="text" name="company" value={this.state.company} placeholder="Company name" />
                        <label for="email">Please enter an email address</label>
                        <input onChange={this.handleChange.bind(this)} type="email" name="email" value={this.state.email}placeholder="Email" />
                        <button type="submit">Submit</button>
                    </form>
                </section>
            </div>
        </div>
        );
    }
}
export default App;