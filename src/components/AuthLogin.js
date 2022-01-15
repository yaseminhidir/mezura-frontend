import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Alert,
  Row,
  Card,
  FormGroup,
  Label,
  Col,
  Button,
  Input,
  CardText,
  CardBody,
  CardTitle,
  CardFooter,
  Container,
} from "reactstrap";
import * as authActions from "../redux/actions/authActions";

class authLogin extends Component {
  state = { user: { username: "", password: "" } };
  logInSend = (user) => {
    this.props.actions.logIn(user);
  };
  onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    });
  };
  render() {
    return (
      <Container>
        <Row>
          <Col xs="4"> </Col>
          <Col xs="4" style={{ marginTop: "70px" }}>
            <Card className="mx">
              <CardBody>
                {this.props.error != null ? (
                  <Alert color="danger">{this.props.error}</Alert>
                ) : (
                  <div></div>
                )}
                <CardTitle style={{ marginBottom: "30px" }} tag="h6">
                  Giriş Yap
                </CardTitle>
                <CardText>
                  <FormGroup row>
                    <Col xs="4">
                      <Label for="exampleEmail">
                        <small>Kullanıc adı:</small>
                      </Label>
                    </Col>
                    <Col xs="8">
                      <Input
                        bsSize="sm"
                        onChange={this.onChangeHandler}
                        name="username"
                        type="text"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="4">
                      <Label for="examplePassword">
                        <small>Parola</small>
                      </Label>
                    </Col>
                    <Col xs="8">
                      <Input
                        bsSize="sm"
                        onChange={this.onChangeHandler}
                        id="examplePassword"
                        name="password"
                        type="password"
                      />
                    </Col>
                  </FormGroup>
                </CardText>
                <Col
                  sm={{
                    offset: 2,
                    size: 10,
                  }}
                ></Col>
              </CardBody>
              <CardFooter>
                <Row>
                  <Col xs="4"></Col>
                  <Col xs="4"></Col>
                  <Col xs="4">
                    {" "}
                    <Button
                      size="sm"
                      color="success"
                      outline
                      className="align-top"
                      outline
                      onClick={() => this.logInSend(this.state.user)}
                    >
                      Giriş Yap
                    </Button>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
          <Col xs="4"> </Col>
        </Row>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    error: state.authErrorReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      logIn: bindActionCreators(authActions.logIn, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(authLogin);
