import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class TextInput extends Component {
    render() {
        return (
            <div>
                <label for={this.props.fieldDetails.fieldCode}>{this.props.fieldDetails.fieldLabel}</label>
                <input id={this.props.fieldDetails.fieldCode} onChange={this.props.handleTextChange.bind(this)} type={this.props.fieldDetails.fieldType} name={this.props.fieldDetails.fieldCode} value={this.props.fieldValue} placeholder={this.props.fieldDetails.fieldPlaceholder} />
            </div>
        )
    }
}

TextInput.propTypes = {
    fieldDetails: PropTypes.object.isRequired,
    fieldValue: PropTypes.string.isRequired,
    handleTextChange: PropTypes.func.isRequired
}

export default TextInput
