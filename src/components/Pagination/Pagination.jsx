import React from 'react';
import PropTypes from 'prop-types';
import {Pager, Row, Col} from "react-bootstrap"; 
import _ from 'lodash';
import './Pagination.css';
 
class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }
 
    componentWillMount() {
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }
 
    componentDidUpdate(prevProps, prevState) {
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }
 
    setPage(page) {
        var items = this.props.items.slice(1);
        var pager = this.state.pager;
        if (page < 1) {
            return;
        }
        pager = this.getPager(items.length, page);
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        this.setState({ pager: pager });
        this.props.onChangePage(pageOfItems);
    }
 
    getPager(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;
        pageSize = pageSize || 51;
        var totalPages = Math.ceil(totalItems / pageSize);
        var startPage, endPage;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
 
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        var pages = _.range(startPage, endPage + 1);
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
 
    render() {
        var pager = this.state.pager;
        if (!pager.pages || pager.pages.length <= 1) {
            return null;
        }
        return (
            <Row className="justify-content-center">
                <Col xs={12}>
                    <Pager className="pagination">
                        <Pager.Item className={pager.currentPage === 1 ? 'disabled page-link' : 'page-link'} onClick={() => this.setPage(1)}>
                            First
                        </Pager.Item>
                        <Pager.Item className={pager.currentPage === 1 ? 'disabled page-link' : 'page-link'} onClick={() => this.setPage(pager.currentPage - 1)}>
                            Previous
                        </Pager.Item>
                        {pager.pages.map((page, index) =>
                            <Pager.Item key={index} className={pager.currentPage === page ? 'active page-link' : 'page-link'} onClick={() => this.setPage(page)}>
                                {page}
                            </Pager.Item>
                        )}
                        <Pager.Item className={pager.currentPage === pager.totalPages ? 'disabled page-link' : 'page-link'} onClick={() => this.setPage(pager.currentPage + 1)}>
                            Next
                        </Pager.Item>
                        <Pager.Item className={pager.currentPage === pager.totalPages ? 'disabled page-link' : 'page-link'} onClick={() => this.setPage(pager.totalPages)}>
                            Last
                        </Pager.Item>
                    </Pager>
                </Col>
            </Row>
        );
    }
}
 
Pagination.propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number
};

Pagination.defaultProps = {
    initialPage: 1
};

export default Pagination;