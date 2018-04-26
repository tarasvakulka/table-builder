import React, {Component} from 'react';

import Table from '../Table/Table';
import DataSwitch from '../DataSwitch/DataSwitch';
import './TableView.css';

class TableView extends Component {
    state = {
        tableData: [],
        searchValue: ''
    };

    render() {
        return(
            <div className="container my-2">
                <DataSwitch onLoadData={this.onLoadData}/>
                {
                    this.state.tableData.length !== 0 ? <Table data={this.state.tableData}/> : null
                }
            </div>
        );
    }

    onLoadData = (data) => {
        this.setState({tableData: data});
    }

}

export default TableView;