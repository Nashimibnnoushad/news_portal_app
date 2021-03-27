import React from "react";
import { Container, Row, Col, Jumbotron, Card, CardBody, Button } from "reactstrap";
import '../styles/app.css';
import { AvForm, AvField } from "availity-reactstrap-validation";
import { withRouter  } from "react-router-dom";
import NavBar from './navBar'

class Profile extends React.Component {
    state = {
        username: null,
        email: null,
        password: null
    }


    componentDidMount=()=> {
        let user = JSON.parse(localStorage.getItem("user")) || {};
        this.setState({
            username : user.username,
            email : user.email,
            password : user.password
        })

    }

    handleValidSubmit = (event, values) => {
        if(values){
            let userlist =  JSON.parse(localStorage.getItem("userlist"))
            let userindex = userlist.findIndex(val => val.email === values.email);
            let updateduser = {"username":values.username, "email": values.email, "password": values.password}
            userlist[userindex] = updateduser
            localStorage.setItem("userlist", JSON.stringify(userlist));
            localStorage.setItem("user", JSON.stringify(updateduser));
            alert("User details are updated")               
        }

      };
    
      handleInvalidSubmit = (event, errors, values) => {
        this.setState({ email: values.email, error: true });
      };



    render() {
        return (
            <>
                <Container>
                <h1 className="header">News Portal App</h1>
                    <NavBar />
                    <Row>
                        <Col />
                        <Col lg="8">
                            <Jumbotron>
                                <h3>
                                    <u>Profile</u>
                                </h3>
                                <hr />
                                <Card>
                                    <CardBody>
                                    <AvForm
                                            onValidSubmit={this.handleValidSubmit}
                                            onInvalidSubmit={this.handleInvalidSubmit}
                                    >
                                    <AvField
                                                name="username"
                                                label="Username"
                                                type="text"
                                                value= {this.state.username}
                                                validate={{
                                                    required: {
                                                        value: true,
                                                        errorMessage: "Please enter your username"
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9_][a-zA-Z]+[0-9]*$/,
                                                        errorMessage:
                                                            "Your username must be composed only with letter and numbers"
                                                    },
                                                }}
                                            />
                                            <AvField
                                                name="email"
                                                label="Email"
                                                type="text"
                                                value= {this.state.email}
                                                disabled='true'
                                                validate={{
                                                    required: true,
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/,
                                                        errorMessage:
                                                            "Invalid Email"
                                                    },
                                                    email: true
                                                }}
                                            />
                                            <AvField
                                                name="password"
                                                label="Password"
                                                type="password"
                                                value= {this.state.password}
                                                validate={{
                                                    required: {
                                                        value: true,
                                                        errorMessage: "Please enter your password"
                                                    },
                                                    pattern: {
                                                        value: `^[A-Za-z0-9]+$`,
                                                        errorMessage:
                                                            "Your password must be composed only with letter and numbers"
                                                    },
                                                    minLength: {
                                                        value: 6,
                                                        errorMessage: "Your password must be between 6 and 20 characters"
                                                    },
                                                    maxLength: {
                                                        value: 20,
                                                        errorMessage: "Your password must be between 6 and 20 characters"
                                                    }
                                                }}
                                            />
                                            <Button id="submit">Update</Button>
                                        </AvForm>
                                    </CardBody>
                                </Card>
                            </Jumbotron>
                        </Col>
                        <Col />
                    </Row>
                </Container>
            </>
        );
    }
}



export default withRouter(Profile)