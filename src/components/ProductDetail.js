import API from "../api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import alertify from "alertifyjs";

import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Row,
  Col,
  Label,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  Button,
  ListGroupItem,
  CardFooter,
} from "reactstrap";

async function getProductById(productId) {
  var res = await API.ProductApi.productsProductIdGet(productId);
  return res.data.data;
}

export default function ProductDetail() {
  var [product, setProduct] = useState({ productDetails: [] });
  var [open, setOpen] = useState(false);
  let { productId } = useParams();

  useEffect(async () => {
    if (productId) {
      var product = await getProductById(productId);
    } else {
      var product = { id: 0, productDetails: [] };
    }
    setProduct(product);
    console.group(product);
  }, [productId]);

  function handleChange(e) {
    var { name, value } = e.target;
    var newProduct = {
      ...product,
      [name]: value,
    };
    setProduct(newProduct);
  }
  var [editingIndex, setEditingIndex] = useState(-1);

  function editDetail(index) {
    setEditingIndex(index);
    console.log(editingIndex);
    setOpen(true);
  }

  function handleProductDetailChange(e) {
    var { name, value } = e.target;
    var detail = product.productDetails[editingIndex];
    var newDetail = {
      ...detail,
      [name]: value,
    };
    var newProductDetails = [...product.productDetails];

    /*
      1- {..... bla bla}
      2- {.... bla bla}
      3- {name:"test"} -> {name:"test2"} // array[index] = newObj;
      4- {bla bla}
    */
    newProductDetails[editingIndex] = newDetail; //obj
    var newProduct = {
      ...product,
      productDetails: newProductDetails,
    };

    setProduct(newProduct);
  }

  function addNewDetail() {
    var newProduct = {
      ...product,
      productDetails: [...product.productDetails, {}],
    };
    setProduct(newProduct);
    editDetail(newProduct.productDetails.length - 1);  
  }



  async function saveProduct(product) {

    var res = await API.ProductApi.productsProductPost(product);
    if (res.data.success) {
      var message =
        product.id === 0 ? "Başarıyla Eklendi" : "Başarıyla Güncellendi";
      alertify.success(message);
    } else {
      alertify.error("Bir hata oluştu");
    }
  }
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5"> Ürün Detayı</CardTitle>
        <Form>
          <Row>
            <Col xs="4">
              <FormGroup>
                <Label for="productName">İsim</Label>
                <Input
                  bsSize="sm"
                  id="productName"
                  name="name"
                  onChange={handleChange}
                  value={product.name || null}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <Label for="description">Açıklama</Label>
                <Input
                  bsSize="sm"
                  id="description"
                  name="description"
                  onChange={handleChange}
                  value={product.description || null}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <Input
                  id="cesit"
                  type="checkbox"
                  value={product.hasDetails}
                  onChange={(e) => {
                    var newProduct = {
                      ...product,
                      hasDetails: e.target.checked,
                    };
                    setProduct(newProduct);
                  }}
                />
                <Label for="cesit">Ürün Çeşitleri İçerir</Label>
              </FormGroup>
            </Col>
          </Row>

          <div style={{ marginBottom: 10 + "px" }}>
            {product.hasDetails ? (
              <div>
                {" "}
                <Card>
                  <CardBody>
                    <CardTitle tag="h6">Ürün Çeşitleri</CardTitle>
                    {product.productDetails && (
                      <Row>
                        {product.productDetails.map((detail, index) => (
                          <ListGroupItem
                            key={detail.id}
                            onClick={() => editDetail(index)}
                          >
                            <FaStar className="h5"></FaStar> {detail.name}
                          </ListGroupItem>
                        ))}
                      </Row>
                    )}
                  </CardBody>
                  <CardFooter>
                    {" "}
                    <Button
                      outline
                      color="primary"
                      onClick={(e) => addNewDetail()}
                    >
                      YENİ ÇEŞİT EKLE
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              <div>
                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label for="price">Birim Fiyat</Label>
                      <Input
                        bsSize="sm"
                        id="price"
                        name="price"
                        onChange={handleChange}
                        value={product.price || null}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label for="quantity">Stok Miktarı</Label>
                      <Input
                        bsSize="sm"
                        id="quantity"
                        name="quantity"
                        type="number"
                        onChange={handleChange}
                        value={product.quantity}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label for="taxRate">Vergi Oranı</Label>
                      <Input
                        bsSize="sm"
                        id="taxRate"
                        name="taxRate"
                        onChange={handleChange}
                        value={product.taxRate || null}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label for="taxRate">Birim Türü</Label>
                      <Input
                        bsSize="sm"
                        value={product.unitType || ""}
                        className="mb-3"
                        type="select"
                        name="unitType"
                      >
                        <option value="0">Metretül</option>
                        <option value="1">Metre Kare</option>
                        <option value="2">Adet</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            )}
          </div>
          <Button
            size="sm"
            color="success"
            outline
            onClick={() => saveProduct(product)}
          >
            KAYDET
          </Button>
        
        </Form>
        {editingIndex != -1 && product.productDetails[editingIndex] ? (
          <Modal centered={true} isOpen={open}>
            <ModalHeader toggle={() => setOpen(false)}>Modal title</ModalHeader>
            <ModalBody>
              <Form>
                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label for="productName">İsim</Label>
                      <Input
                        bsSize="sm"
                        id="productName"
                        name="name"
                        onChange={handleProductDetailChange}
                        value={
                          product.productDetails[editingIndex].name || null
                        }
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label for="description">Açıklama</Label>
                      <Input
                        bsSize="sm"
                        id="description"
                        name="description"
                        onChange={handleProductDetailChange}
                        value={
                          product.productDetails[editingIndex].description ||
                          null
                        }
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label for="price">Birim Fiyat</Label>
                      <Input
                        bsSize="sm"
                        id="price"
                        name="price"
                        onChange={handleProductDetailChange}
                        value={
                          product.productDetails[editingIndex].price || null
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label for="quantity">Stok Miktarı</Label>
                      <Input
                        bsSize="sm"
                        id="quantity"
                        name="quantity"
                        onChange={handleProductDetailChange}
                        type="number"
                        value={product.productDetails[editingIndex].quantity}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label for="taxRate">Vergi Oranı</Label>
                      <Input
                        bsSize="sm"
                        id="taxRate"
                        name="taxRate"
                        onChange={handleProductDetailChange}
                        value={
                          product.productDetails[editingIndex].taxRate || null
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label for="taxRate">Birim Türü</Label>
                      <Input
                        bsSize="sm"
                        value={
                          product.productDetails[editingIndex].unitType || ""
                        }
                        className="mb-3"
                        type="select"
                        name="unitType"
                      >
                        <option value="0">Metretül</option>
                        <option value="1">Metre Kare</option>
                        <option value="2">Adet</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Button outline color="success" onClick={(e) => setOpen(false)}>
                  Kaydet
                </Button>
              </Form>
            </ModalBody>
          </Modal>
        ) : null}
      </CardBody>
    </Card>
  );
}
