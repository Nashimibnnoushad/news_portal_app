import React from "react";
import { Container, Row, Col, Jumbotron, Card, CardBody, Button } from "reactstrap";
import '../styles/app.css';
import { AvForm, AvField } from "availity-reactstrap-validation";
import { withRouter  } from "react-router-dom";

class Register extends React.Component {
    state = {
        email: null,
        password: null,
        username: null
    }


    handleValidSubmit = (event, values ) => {
        if(values){
            let userlist =  JSON.parse(localStorage.getItem("userlist"))
            if(userlist === null){
                userlist = []
                userlist.push(values)
                localStorage.setItem("userlist", JSON.stringify(userlist));
                this.login()
            }
            else {
                let user = userlist.filter((value) => value.email === values.email)
                if(user.length === 0 ){
                    userlist.push(values)
                    localStorage.setItem("userlist", JSON.stringify(userlist));
                    this.login()
                }
                else{
                    alert("This mail id has been already taken!")
                }
            }

        }
      };
    
      handleInvalidSubmit = (event, errors, values) => {
        this.setState({ email: values.email, error: true });
      };

      login = () => {
        const { history } = this.props;
        if(history) history.push('/login');
      }


    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col />
                        <Col lg="8">
                            <Jumbotron>
                                <h3>
                                    <u>Register Form</u>
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
                                            <p>If you have an account, Please <Button onClick={()=>this.login()}>Login</Button></p>
                                            <Button id="submit">Submit</Button>
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



export default withRouter(Register)