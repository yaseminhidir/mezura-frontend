import Nav from "./Nav";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import AuthLogin from "./AuthLogin";
import SideBar from "./SideBar";
import Accounts from "./Accounts";
import AccountDetail from "./AccountDetail";
import Hesaplar from "./Hesaplar";
import { Row, Col, Container } from "reactstrap";
import Products from "./Products";
import ProductDetail from "./ProductDetail";
import FreightBills from "./FreightBills";
import FreightBillDetail from "./FreightBillDetail";


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
                <Route path="/urunler" exact={true} component={Products} />
                <Route path="/irsaliyeler" exact={true} component={FreightBills} />
                <Route path="/irsaliyeler/:freightBillId" exact={true} component={FreightBillDetail} />
                <Route path="/irsaliyeler/yeniekle" exact={true} component={FreightBillDetail} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
