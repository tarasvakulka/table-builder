import React, {Component} from 'react';
import PropTypes from 'prop-types';

import apiTable from '../../api/tabledata';
import './DataSwitch.css';

class DataSwitch extends Component {
    state = {
        tableData: [],
        id: false,
        name: false,
        price: false,
        quantity: false,
        isDataCheckBoxes: false
    };

    render() {
        return(
            <div className="row align-items-center flex-column">
                <div className="row">
                    <span className="mr-3">Choose size of data and press 'Load':</span>
                    <label className="radio-inline mr-3">
                        <input type="radio" name="optradio" value="small" onClick={this.handleCheckSize}/> Small
                    </label>
                    <label className="radio-inline mr-3">
                        <input type="radio" name="optradio" value="big" onClick={this.handleCheckSize}/> Big
                    </label>
                    <label className="radio-inline mr-3">
                        <input type="radio" name="optradio" value="own" onClick={this.handleCheckSize}/> Own
                    </label>
                    <button className="ml-4 btn btn-primary" onClick={this.handleDataLoad}>Load Data</button>
                </div>
                <div className="row form-check form-check-inline mt-2" style={{display: this.state.isDataCheckBoxes ? 'block' : 'none'}}>
                    <span className="mr-3">Choose your own data template and press 'Load':</span>
                    <label className="form-check-label mr-3">
                        <input className="form-check-input" type="checkbox" value="id" onChange={this.handleSetData} checked={this.state.id}/>
                        Id
                    </label>
                    <label className="form-check-label mr-3">
                        <input className="form-check-input" type="checkbox" value="name" onChange={this.handleSetData} checked={this.state.name}/>
                        Name
                    </label>
                    <label className="form-check-label mr-3">
                        <input className="form-check-input" type="checkbox" value="price" onChange={this.handleSetData} checked={this.state.price}/>
                        Price
                    </label>
                    <label className="form-check-label mr-3">
                        <input className="form-check-input" type="checkbox" value="quantity" onChange={this.handleSetData} checked={this.state.quantity}/>
                        Quantity
                    </label>
                </div>
            </div>
        );
    }

    handleCheckSize = (e) => {
        let value = e.target.value;
        switch (value) {
            case 'small':
                this.setState({id: true, name: true, price: false, quantity: false, isDataCheckBoxes: false});
                break;
            case 'big':
                this.setState({id: true, name: true, price: true, quantity: true, isDataCheckBoxes: false});
                break;
            case 'own':
                this.setState({id: false, name: false, price: false, quantity: false, isDataCheckBoxes: true});
                break;
            default:
                break;
        }
    }

    handleSetData = (e) => {
        let property = e.target.value;
        this.setState({[property]: !this.state[property] })
    }

    handleDataLoad = () => {
        apiTable.getTableData().then(response => {
            let data = response.map( (item, index) => {
                let newItem = this.mapDataItem(item, index);
                return newItem;
            });
            this.props.onLoadData(data);
        })
    }

    mapDataItem(item, index) {
        if (index === 0) {
            if (!this.state.id) delete item.id;
            if (!this.state.name) delete item.name;
            if (!this.state.price) delete item.price;
            if (!this.state.quantity) delete item.quantity;
            return item;
        } else {
            let array = [];
            if (this.state.id) array.push(item[0]);
            if (this.state.name) array.push(item[1]);
            if (this.state.price) array.push(item[2]);
            if (this.state.quantity) array.push(item[3]);
            return array;
        }
    }



}

DataSwitch.propTypes = {
    onLoadData: PropTypes.func.isRequired
};

export default DataSwitch;