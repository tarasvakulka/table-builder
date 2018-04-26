import React, {Component} from 'react';
import uuid from 'uuid';

import SearchField from '../SearchField/SearchField';
import Pagination from '../Pagination/Pagination';
import './Table.css';
import PropTypes from "prop-types";

class Table extends Component {
    state = {
        tableData: this.props.data,
        pageItems: [],
        isSortedById: true,
        isSortedByName: false,
        isSortedByPrice: false,
        isSortedByQuantity: false,
        currentRow: null,
        searchValue: ''
    };

    componentWillReceiveProps(nextProps) {
        this.setState({tableData: nextProps.data});
    }

    render() {
        return(
            <div className="row align-items-center flex-column my-3">
                <SearchField inputvalue={this.state.searchValue}
                             handleSearch={this.handleSearch}
                             isDisabled={this.searchDisabled()}/>
                <table className="table">
                    <thead>
                    <tr>
                        {
                            Object.keys(this.state.tableData[0]).map((property, index) => {
                                return (
                                    <th key={uuid()} onClick={() => this.handleColumnSort(property, index)}>
                                        {this.state.tableData[0][property]}
                                    </th>
                                );
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.pageItems.map((data, index) => {
                                return (
                                    <tr key={uuid()} onClick={() => this.handleRowClick(index)}>
                                        {
                                            data.map((item) => <td key={uuid()}>{item}</td> )
                                        }
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <div className="card d-block">
                    <div>Row data:</div>
                    <ul className="list-inline">
                        {
                            this.getRowData()
                        }
                    </ul>
                </div>
                <Pagination items={this.state.tableData} onChangePage={this.onChangePage}/>
            </div>
        );
    }

    onChangePage = (pageItems) => {
        this.setState({ pageItems: pageItems });
    }

    handleColumnSort(property, index) {
        switch (property) {
            case 'id':
                this.sortNumber(this.state.isSortedById, index);
                this.setState({isSortedById: !this.state.isSortedById});
                break;
            case 'name':
                this.sortString(this.state.isSortedByName, index);
                this.setState({isSortedByName: !this.state.isSortedByName});
                break;
            case 'price':
                this.sortNumber(this.state.isSortedByPrice, index);
                this.setState({isSortedByPrice: !this.state.isSortedByPrice});
                break;
            case 'quantity':
                this.sortNumber(this.state.isSortedByQuantity, index);
                this.setState({isSortedByQuantity: !this.state.isSortedByQuantity});
                break;
            default:
                break;
        }
    }

    handleSearch = (e) => {
        this.setState({searchValue: e.target.value});
        let searchQuery = e ? e.target.value.toLowerCase() : '';
        if (searchQuery === '' ) {
            this.setState({tableData: this.props.data});
        } else {
            let nameIndex = Object.keys(this.props.data[0]).indexOf('name');
            let displayedData = this.props.data.slice(1).filter(function (item) {
                let searchValue = item[nameIndex].toLowerCase();
                return searchValue.indexOf(searchQuery) !== -1;
            });
            this.setState({tableData: [this.props.data[0], ...displayedData]});
        }
    }

    handleRowClick = (rowIndex) => {
        this.setState({currentRow: rowIndex});
    }

    sortNumber(isSorted, index) {
        let sortArray = this.state.tableData.slice(1);
        let count = sortArray.length-1;
        if (!isSorted) {
            for (let i = 0; i < count; i++) {
                for (let j = 0; j < count - i; j++) {
                    if (parseInt(sortArray[j][index], 10) > parseInt(sortArray[j + 1][index], 10)) {
                        let max = sortArray[j];
                        sortArray[j] = sortArray[j + 1];
                        sortArray[j + 1] = max;
                    }
                }
            }
        } else {
            for (let i = 0; i < count; i++) {
                for (let j = 0; j < count - i; j++) {
                    if (parseInt(sortArray[j][index], 10) < parseInt(sortArray[j + 1][index], 10)) {
                        let min = sortArray[j];
                        sortArray[j] = sortArray[j + 1];
                        sortArray[j + 1] = min;
                    }
                }
            }
        }
        this.setState({tableData: [this.state.tableData[0], ...sortArray]})
    }

    sortString(isSorted, index) {
        let sortArray = this.state.tableData.slice(1);
        let count = sortArray.length-1;
        if (!isSorted) {
            for (let i = 0; i < count; i++) {
                for (let j = 0; j < count - i; j++) {
                    if (sortArray[j][index] > sortArray[j + 1][index]) {
                        let max = sortArray[j];
                        sortArray[j] = sortArray[j + 1];
                        sortArray[j + 1] = max;
                    }
                }
            }
        } else {
            for (let i = 0; i < count; i++) {
                for (let j = 0; j < count - i; j++) {
                    if (sortArray[j][index] < sortArray[j + 1][index]) {
                        let min = sortArray[j];
                        sortArray[j] = sortArray[j + 1];
                        sortArray[j + 1] = min;
                    }
                }
            }
        }
        this.setState({tableData: [this.state.tableData[0], ...sortArray]})
    }

    searchDisabled() {
        if (Object.keys(this.state.tableData[0]).indexOf('name') !== -1) return false;
        else return true;
    }

    getRowData() {
        if (this.state.pageItems[this.state.currentRow])
            return this.state.pageItems[this.state.currentRow].map((item, index) => {
                return <li key={uuid()} className="list-inline-item">{item}</li>;
            });
        else
            return null;
    }

}

Table.propTypes = {
    data: PropTypes.array.isRequired
};

export default Table;