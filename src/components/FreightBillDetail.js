import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import alertify from "alertifyjs";
import { FaBars } from "react-icons/fa";

import {
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  CardBody,
  Card,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  ModalFooter,
} from "reactstrap";
import API from "../api";
import ProductDetail from "./ProductDetail";

function getAmmount(freightLine) {
  if (freightLine.unitType == 0) {
    return freightLine.centimeters + " cm";
  }
  if (freightLine.unitType == 1) {
    return (freightLine.widthCM * freightLine.lengthCM) / 10000 + " m2";
  }
  if (freightLine.unitType == 2) {
    return freightLine.quantity + " adet";
  }
}
function calculateLine(line) {
  var grossTotal = 0;
  if (line.unitType == 0) {
    grossTotal = line.centimeters || 0 * line.unitPrice || 0;
  }
  if (line.unitType == 1) {
    grossTotal =
      ((line.widthCM || 0 * line.lengthCM || 0) / 10000) * line.unitPrice || 0;
  }
  if (line.unitType || 0 == 2) {
    grossTotal = line.unitPrice || 0;
  }
  grossTotal *= line.quantity || 0;
  var discountTotal = 0;
  discountTotal += (grossTotal / 100) * line.discountPercent || 0;
  discountTotal += line.discountFlat || 0;
  var subTotal = grossTotal - discountTotal;
  var taxTotal = (subTotal / 100) * line.taxRate || 0;
  var total = taxTotal + subTotal;
  return {
    total,
    grossTotal,
    subTotal,
    taxTotal,
    discountTotal,
  };
}
function formatWithCurrency(value, currency) {
  var userLang = navigator.language || navigator.userLanguage;
  currency = currency || { shortCode: "TRY" };
  var formatter = new Intl.NumberFormat(userLang, {
    style: "currency",
    currency: currency.shortCode,
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
}

export default function FreightBillDetail() {
  var [freightBill, setFreightBill] = useState({ freightBillLines: [] });
  var [accounts, setAccounts] = useState([]);
  var [currencies, setCurrency] = useState([]);
  var [products, setProduct] = useState([]);
  var [open, setOpen] = useState(false);
  var [index, setIndex] = useState();
  var [selectedProduct, setSelectedProduct] = useState({ id: 0 });
  var [openProductDetail, setOpenDetail] = useState(false);
  var [selectedProductDetail, setSelectedProductDetail] = useState({ id: 0 });

  let { freightBillId } = useParams();
  var useFreightBillId = freightBillId || 0;

  useEffect(async () => {
    var response = await API.FreightBillApi.freightbillsBillsIdGet(
      useFreightBillId
    );
    setFreightBill(response.data.data.freightBill);
    setAccounts(response.data.data.accounts);
    setCurrency(response.data.data.currencies);
    setProduct(response.data.data.products);

    console.log(response);
  }, [freightBillId]);

  function addNewLine() {
    var newFreightBill = {
      ...freightBill,
      freightBillLines: [...freightBill.freightBillLines, {}],
    };
    setFreightBill(newFreightBill);
  }

  function format(value) {
    var currencyId = freightBill.currencyId;
    var search = currencies.filter((x) => x.id == currencyId);
    var currency = null;
    if (search.length > 0) {
      currency = search[0];
    }
    return formatWithCurrency(value, currency);
  }

  function handleChangeLine(e, index) {
    var { name, value } = e.target;
    var line = freightBill.freightBillLines[index];
    var newLine = {
      ...line,
      [name]: value,
    };
    var newFreightBillLines = [...freightBill.freightBillLines];
    newFreightBillLines[index] = newLine;
    var newFreightBill = {
      ...freightBill,
      freightBillLines: newFreightBillLines,
    };
    setFreightBill(newFreightBill);
  }

  function handleChange(e) {
    var { name, value } = e.target;
    var newFreightBill = {
      ...freightBill,
      [name]: value,
    };
    setFreightBill(newFreightBill);
  }

  function handleChangeModal(e) {
    var id = e.target.value;
    if (id == 0) {
      return setSelectedProduct({ id: 0 });
    }
    var product = products.find((x) => x.id == id);
    setSelectedProduct(product);
  }

  function handleChangeDetailModal(e) {
    var id = e.target.value;
    var product = freightBill.freightBillLines[index].product.productDetails.find(x=>x.id == id); 
    setSelectedProductDetail(product);
  }

  async function saveFreightBill(freightBill) {
    var res = await API.FreightBillApi.freightbillsBillsPost(freightBill);

    console.log(res.data);
    setFreightBill(res.data.data.freightBill);
    if (res.data.success) {
      var message =
        freightBill.id === 0 ? "Başarıyla Eklendi" : "Başarıyla Güncellendi";
      alertify.success(message);
    } else {
      alertify.error("Bir hata oluştu");
    }
  }

  async function finalizeFreightBill(freightBill) {
    console.log(API.FreightBillApi);
    var res = await API.FreightBillApi.freightbillsBillsFinalizePost(
      freightBill
    );

    setFreightBill(res.data.data.freightBill);
  }
  function openModal(lineIndex) {
    setIndex(lineIndex);
    setOpen(true);
  }

  function productSelected() {
    var line = freightBill.freightBillLines[index];
    var newLine = {
      ...line,
      productName: selectedProduct.name,
      productId: selectedProduct.id,
      product: selectedProduct,
    };
    var newFreightBillLines = [...freightBill.freightBillLines];
    newFreightBillLines[index] = newLine;
    var newFreightBill = {
      ...freightBill,
      freightBillLines: newFreightBillLines,
    };
    setFreightBill(newFreightBill);
    setOpen(false);
    console.log(newFreightBill);
  }

  function productDetailSelected() {
    var line = freightBill.freightBillLines[index];
    var newLine = {
      ...line,
      productDetailName: selectedProductDetail.name,
    };
    var newFreightBillLines = [...freightBill.freightBillLines];
    newFreightBillLines[index] = newLine;
    var newFreightBill = {
      ...freightBill,
      freightBillLines: newFreightBillLines,
    };
    setFreightBill(newFreightBill);
    setOpenDetail(false);
  }
  return (
    <div>
      {freightBill.id && (
        <Button
          onClick={() => finalizeFreightBill(freightBill)}
          className="btn btn-success btn-sm"
        >
          İrsaliyeyi Bitir ve Cariye Ekle
        </Button>
      )}
      <Card style={{ marginTop: 20 + "px" }}>
        <CardBody>
          <CardTitle>
            <h5>İrsaliye</h5>
          </CardTitle>
          <Row>
            <Col xs="4">
              <FormGroup>
                <Label for="name">İsim</Label>
                <Input
                  bsSize="sm"
                  id="name"
                  name="name"
                  disabled={freightBill.finalized}
                  onChange={handleChange}
                  value={freightBill.name || null}
                />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <Label for="code">Kod</Label>
                <Input
                  bsSize="sm"
                  id="code"
                  name="code"
                  disabled={freightBill.finalized}
                  onChange={handleChange}
                  value={freightBill.code || null}
                />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <Label for="account">Cari</Label>
                <Input
                  bsSize="sm"
                  id="account"
                  name="accountId"
                  type="select"
                  disabled={freightBill.finalized}
                  onChange={handleChange}
                  value={freightBill.accountId || null}
                >
                  <option value={null}>Seçiniz</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <Label for="currency">Para Birimi</Label>

                <Input
                  bsSize="sm"
                  id="currency"
                  name="currencyId"
                  type="select"
                  onChange={handleChange}
                  disabled={freightBill.finalized}
                  value={freightBill.currencyId || null}
                >
                  {currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                      {currency.dispLayName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Table striped responsive>
            <thead>
              <tr>
                <th>
                  <small>Ürün</small>
                </th>
                <th>
                  <small>Çeşit</small>
                </th>
                <th>
                  <small>Birim Fiyat</small>
                </th>
                <th>
                  <small>Miktar</small>
                </th>
                <th>
                  <small>Adet</small>
                </th>
                <th>
                  <small>Vergi Oranı</small>
                </th>
                <th>
                  <small>İndirim %</small>
                </th>
                <th>
                  <small>İndirim -</small>
                </th>
                <th>
                  <small>Alt Toplam</small>
                </th>
                <th>
                  <small>İndirim</small>
                </th>
                <th>
                  <small>KDV</small>
                </th>
                <th>
                  <small>Toplam</small>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {freightBill.freightBillLines.map((line, index) => (
                <tr key={line.id}>
                  <td>
                    <InputGroup style={{ width: "150px" }}>
                      <Input
                        bsSize="sm"
                        value={line.productName}
                        name="productName"
                        disabled={freightBill.finalized}
                        onChange={(e) => handleChangeLine(e, index)}
                      ></Input>

                      <Button
                        className="btn btn-light btn-sm"
                        style={{
                          background: "none",
                        }}
                        type="button"
                        onClick={() => openModal(index)}
                      >
                        <FaBars></FaBars>
                      </Button>
                    </InputGroup>
                  </td>
                  <td>
                    <InputGroup style={{ width: "150px" }}>
                      <Input
                        bsSize="sm"
                        value={line.productDetailName}
                        name="productDetailName"
                        disabled={freightBill.finalized}
                        onChange={(e) => handleChangeLine(e, index)}
                      ></Input>
                      {line.product &&
                      line.product.hasDetails &&
                      line.product.productDetails.length > 0 ? (
                        <Button
                          className="btn btn-light btn-sm"
                          style={{
                            background: "none",
                          }}
                          onClick={(e) => setOpenDetail(true)}
                          type="button"
                        >
                          <FaBars></FaBars>
                        </Button>
                      ) : null}
                    </InputGroup>
                  </td>
                  <td>
                    <Input
                      bsSize="sm"
                      style={{ width: "50px" }}
                      value={line.unitPrice}
                      name="unitPrice"
                      disabled={freightBill.finalized}
                      onChange={(e) => handleChangeLine(e, index)}
                    ></Input>
                  </td>
                  <td>{getAmmount(line)}</td>
                  <td>
                    <Input
                      bsSize="sm"
                      style={{ width: "50px" }}
                      value={line.quantity}
                      name="quantity"
                      disabled={freightBill.finalized}
                      onChange={(e) => handleChangeLine(e, index)}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      bsSize="sm"
                      style={{ width: "50px" }}
                      value={line.taxRate}
                      name="taxRate"
                      disabled={freightBill.finalized}
                      onChange={(e) => handleChangeLine(e, index)}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      bsSize="sm"
                      style={{ width: "50px" }}
                      value={line.discountPercent}
                      name="discountPercent"
                      disabled={freightBill.finalized}
                      onChange={(e) => handleChangeLine(e, index)}
                    ></Input>
                  </td>
                  <td>
                    <Input
                      bsSize="sm"
                      style={{ width: "50px" }}
                      value={line.discountFlat}
                      name="discountFlat"
                      disabled={freightBill.finalized}
                      onChange={(e) => handleChangeLine(e, index)}
                    ></Input>
                  </td>
                  <td>{format(calculateLine(line).grossTotal)}</td>
                  <td>{format(calculateLine(line).discountTotal)}</td>
                  <td>{format(calculateLine(line).taxTotal)}</td>
                  <td>{format(calculateLine(line).total)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button outline color="primary" onClick={(e) => addNewLine()}>
            YENİ SATIR EKLE
          </Button>
          <Button
            outline
            color="success"
            onClick={(e) => saveFreightBill(freightBill)}
          >
            KAYDET
          </Button>
        </CardBody>
      </Card>
      <Modal centered={true} isOpen={open}>
        <ModalHeader toggle={() => setOpen(false)}>Modal title</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Ürünler</Label>
              <Input
                bsSize="sm"
                id="name"
                name="name"
                type="select"
                onChange={handleChangeModal}
                value={selectedProduct.id}
              >
                <option value="0">Seçiniz</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={(e) => productSelected()}>Tamam</Button>
        </ModalFooter>
      </Modal>
      {openProductDetail ? (
        <Modal centered={true} isOpen={openProductDetail}>
          <ModalHeader toggle={() => setOpenDetail(false)}>
            Modal title
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="name">Ürün Çeşitleri</Label>
                <Input
                  bsSize="sm"
                  id="name"
                  name="name"
                  type="select"
                  value={selectedProductDetail.id}
                  onChange={handleChangeDetailModal}
                >
                   <option value="0">Seçiniz</option>
                  {freightBill.freightBillLines[
                    index
                  ].product.productDetails.map((detail) => (
                    <option key="detail.id" value={detail.id}>{detail.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={(e) => productDetailSelected()}>Tamam</Button>
          </ModalFooter>
        </Modal>
      ) : null}
    </div>
  );
}
