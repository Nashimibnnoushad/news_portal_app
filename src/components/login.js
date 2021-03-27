import React from "react";
import { Container, Row, Col, Jumbotron, Card, CardBody, Button } from "reactstrap";
import '../styles/app.css';
import { AvForm, AvField } from "availity-reactstrap-validation";
import { withRouter  } from "react-router-dom";

class Login extends React.Component {
    state = {
        email: null,
        password: null
    }


    handleValidSubmit = (event, values) => {
        if(values){
            let userlist =  JSON.parse(localStorage.getItem("userlist"))
            if(userlist === null){
                alert("There is no users! Please register")
            }
            else{
            let auth = userlist.findIndex(val => val.email === values.email && val.password === values.password);
            if (auth !== -1) {
                localStorage.setItem("user", JSON.stringify(userlist[auth]));
                this.home()
                } else {
                alert("Wrong Email or Password. Try Again")
            }
            }
        }

      };
    
      handleInvalidSubmit = (event, errors, values) => {
        this.setState({ email: values.email, error: true });
      };

      home = () => {
        const { history } = this.props;
        if(history) history.push('/home');
      }

      register = () => {
        const { history } = this.props;
        if(history) history.push('/register');
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
                                    <u>Login Form</u>
                                </h3>
                                <hr />
                                <Card>
                                    <CardBody>
                                        <AvForm
                                            onValidSubmit={this.handleValidSubmit}
                                            onInvalidSubmit={this.handleInvalidSubmit}
                                        >
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
                                                }}
                                            />
                                            <p>If you dont have an account, Please <Button onClick={()=>this.register()}>Register</Button></p>
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



export default withRouter(Login)