import React, {Component} from 'react';

import './AboutPage.css';

class AboutPage extends Component {

    render() {
        return(
            <div className="about">
                <div className="container">
                    <div className="row fill align-items-center">
                        <div className="col-lg-6">
                            <iframe title="map" width="600" height="450" frameBorder="0" style={{border:'0'}} src="https://www.google.com/maps/embed/v1/place?q=Kyiv&key=AIzaSyACvjtBwYnyGnmhkQlz69xi_a89h9ro7Ks" allowFullScreen></iframe>
                        </div>
                        <div className="col-lg-6 pl-5 ">
                            
                            <ul className="lead">
                                <li className="pb-2 pl-5"> Phone: +380 (068) 025 18 50<br/> Address: Ukraine, Kyiv </li>
                                <li className="pb-2 pl-5"><a href="mailto:vakulkataras@gmail.com">vakulkataras@gmail.com</a></li>
                                <li className="pb-2 pl-5"><a href="https://tarasvakulka.github.io">tarasvakulka.github.io</a></li>
                            </ul> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutPage;