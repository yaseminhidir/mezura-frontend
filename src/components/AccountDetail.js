import API from "../api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import alertify from "alertifyjs";
import {
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  Form,
  FormGroup,
  Row,
  Col,
  Label,
  Input,
  Button,
} from "reactstrap";

async function getAccountById(accountId) {
  var res = await API.AccountApi.accountAccountsIdGet(accountId);
  return res.data.data;
}
async function saveAccount(account) {
  if(account.id==null){
   return account.id=0;
  }
  var res = await API.AccountApi.accountAccountsIdSavePost(account.id, account);
  if (res.data.success) {
    var message =
      account.id === 0 ? "Başarıyla Eklendi" : "Başarıyla Güncellendi";
    alertify.success(message);
  } else {
    alertify.error("Bir hata oluştu");
  }
}

export default function CariDetay() {
  var [account, setAccount] = useState({});
  let { accountId } = useParams();
  useEffect(async () => {
    if (accountId) {
      var account = await getAccountById(accountId);
    } else {
      var account = { id: 0 };
    }
    setAccount(account);
  }, [account.id]);

  function handleChange(e) {
    var { name, value } = e.target;
    var newAccount = {
      ...account,
      [name]: value,
    };
    setAccount(newAccount);
  }
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5"> Cari Detayı </CardTitle>
        <Form>
          <Row>
            <Col xs="4">
              <FormGroup>
                <Label for="accountName">İsim</Label>
                <Input
                  bsSize="sm"
                  id="accountName"
                  name="name"
                  onChange={handleChange}
                  value={account.name || null}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <Label for="contactName">İletişim İsim</Label>
                <Input
                  bsSize="sm"
                  id="contactName"
                  name="contactName"
                  onChange={handleChange}
                  value={account.contactName || null}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <Label for="contactNumber">Telefon</Label>
                <Input
                  bsSize="sm"
                  id="contactNumber"
                  name="contactNumber"
                  onChange={handleChange}
                  value={account.contactNumber || null}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="4">
              <FormGroup>
                <Label for="contactEmail">E-mail</Label>
                <Input
                  bsSize="sm"
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  onChange={handleChange}
                  value={account.contactEmail}
                />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <Label for="address1">Açık Adres</Label>
                <Input
                  bsSize="sm"
                  id="address1"
                  name="address1"
                  onChange={handleChange}
                  value={account.address1 || null}
                />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <Label for="address2">İlçe/Şehir</Label>
                <Input
                  bsSize="sm"
                  id="address2"
                  name="address2"
                  onChange={handleChange}
                  value={account.address2 || null}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <FormGroup>
                <Label for="vergiDairesi">Vergi Dairesi</Label>
                <Input
                  bsSize="sm"
                  id="vergiDairesi"
                  name="vergiDairesi"
                  onChange={handleChange}
                  value={account.vergiDairesi || null}
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label for="vergiNo">Vergi no</Label>
                <Input
                  bsSize="sm"
                  id="vergiNo"
                  name="taxNo"
                  onChange={handleChange}
                  value={account.taxNo || null}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button
            size="sm"
            color="success"
            outline
            onClick={(e) => saveAccount(account)}
          >
            {account.id ? "Güncelle" : "Ekle"}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
