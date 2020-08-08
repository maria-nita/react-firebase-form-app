import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class InputField extends Component {
    render() {
        return (
            <div>
                <label for={this.props.fieldDetails.fieldCode}>
                    {this.props.fieldDetails.fieldLabel}
                </label>
                <input
                id={this.props.fieldDetails.fieldCode}
                type={this.props.fieldDetails.fieldType}
                name={this.props.fieldDetails.fieldCode}
                value={this.props.fieldValue}
                placeholder={this.props.fieldDetails.fieldPlaceholder}
                onChange={this.props.handleTextChange.bind(this)}
                />
            </div>
        )
    }
}

InputField.propTypes = {
    handleTextChange: PropTypes.func.isRequired,
    fieldDetails: PropTypes.object.isRequired,
    fieldValue: PropTypes.string.isRequired
}

export default InputField
