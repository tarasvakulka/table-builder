import React from "react";
import {Link} from "react-router-dom";

class Navbar extends React.Component {

    render() {
        return(
            <nav className="navbar navbar-inverse navbar-expand navbar-dark bg-dark">
                <div className="navbar-right">
                    <ul className="navbar-nav mr-auto">
                        <li  className="nav-item " >
                            <Link id="home_link" className="nav-link" to='/'>Home </Link>
                        </li>
                        <li className="nav-item" >
                            <Link id="about_link" className="nav-link" to='/about'>About</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
export default Navbar;