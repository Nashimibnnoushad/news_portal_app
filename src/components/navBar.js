import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from "reactstrap";
import { withRouter } from "react-router-dom";
class NavBar extends React.Component {
    state = {
        isOpen: false,
        user_name: null
    }

    componentDidMount=()=> {
        let user_name = JSON.parse(localStorage.getItem("user")) || {};
        this.setState({user_name: user_name})

    }

    toggle = () => this.setState({isOpen:!this.state.isOpen});

    logout = () => {
        localStorage.removeItem('user');
        const { history } = this.props;
        if (history) history.push('/login');
    }

    home = () => {
        const { history } = this.props;
        if (history) history.push('/home');
    }

    readLater = () => {
        const { history } = this.props;
        if (history) history.push('/readlater');
    }

    profile = () => {
        const { history } = this.props;
        if (history) history.push('/profile');
    }


    render() {
        return (
            <Navbar color="info" light expand="md">
                <NavbarBrand
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        this.home();
                    }} style={{ color: "white" }}>Home</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.readLater();
                                }}
                                style={{ color: "white" }}
                            >
                                Read Later
                        </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.profile();
                                }}
                                style={{ color: "white" }}
                            >
                                Profile
                        </NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText
                        style={{ color: "white" }}
                    >
                        <h6><b>{this.state.user_name && this.state.user_name.username ? `Hi, ${this.state.user_name.username}` : `Hi, User`}</b></h6>
                        <h6
                            style={{ cursor: "pointer" }}
                            onClick={() => this.logout()}>Logout</h6>
                    </NavbarText>
                </Collapse>
            </Navbar>
        );
    }
}



export default withRouter(NavBar)