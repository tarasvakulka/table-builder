import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchField extends Component {

    render() {
        return (
            <div className="row align-items-center my-3">
                <label>Search by name:</label>
                <input
                    type="text"
                    className="form-control"
                    value={this.props.inputvalue}
                    placeholder="Enter text"
                    onInput={this.props.handleSearch}
                    disabled={this.props.isDisabled}
                />
            </div>
        );
    }
}

SearchField.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    inputvalue: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired
};

export default SearchField;