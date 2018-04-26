import React, {Component} from 'react';
import uuid from 'uuid';

import TableView from '../TableView/TableView';
import './MainPage.css';

class MainPage extends Component {
    state  = {
      tables: []
    };

    render() {
        return(
            <div>
                <button className="btn btn-dark m-1" onClick={this.handleAddTableView}>Add new Table</button>
                <button className="btn btn-dark m-1" onClick={this.handleDeleteTableView}>Delete new Table</button>
                <TableView/>
                {this.state.tables}
            </div>
        );
    }

    handleAddTableView = () => {
        let newTables = this.state.tables.slice();
        newTables.push(<TableView key={uuid()}/>);
        this.setState({tables: newTables});
    }

    handleDeleteTableView = () => {
        let newTables = this.state.tables.slice();
        newTables.pop();
        this.setState({tables: newTables});
    }

}
export default MainPage;