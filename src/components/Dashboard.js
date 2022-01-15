import AuthLogin from "./AuthLogin";
import SideBar from "./SideBar";
import Accounts from "./Accounts";
import AccountDetail from "./AccountDetail";
import Hesaplar from "./Hesaplar";
import Nav from "./Nav";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import { Row, Col, Container } from "reactstrap";
import Products from "./Products";
import ProductDetail from "./ProductDetail";

export default function DashBoard({}) {
  var user = useSelector((state) => state.authReducer);
  if (user === null) {
    return <AuthLogin></AuthLogin>;
  } else {
    return (
      <div>
        <Container>
          <Nav></Nav>
          <Row>
            <Col xs="3">
              <SideBar></SideBar>
            </Col>
            <Col xs="9">
              <Switch>
                <Route path="/cariler" exact={true} component={Accounts} />
                <Route
                  path="/cariler/yeni"
                  component={AccountDetail}
                  exact={true}
                />
                <Route path="/cariler/:accountId" component={AccountDetail} />
                <Route path="/urunler/yeniekle" component={ProductDetail} />
                <Route path="/urunler/:productId" component={ProductDetail} />
                <Route path="/hesaplar" component={Hesaplar} />
                <Route path="/urunler" component={Products} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
