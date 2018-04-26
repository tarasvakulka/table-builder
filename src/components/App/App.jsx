import React, { Component } from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";

import MainPage from '../MainPage/MainPage';
import AboutPage from '../AboutPage/AboutPage';
import Navbar from '../Navbar/Navbar';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div className="App">
                    <Navbar/>
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route path="/about" component={AboutPage}/>
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

export default App;
