import API from "../api";
import { Table, Card, CardTitle, CardBody } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

async function getProducts() {
  var res = await API.ProductApi.productsProductsGet();
  return res.data.data;
}
export default function Products() {
  var [products, setProduct] = useState([]);
  useEffect(async () => {
    var products = await getProducts();
    setProduct(products);
  }, []);
  return (
    <div>
      <NavLink to="urunler/yeniekle" className="btn btn-success btn-sm">
        Yeni Ürün Ekle
      </NavLink>
      <Card style={{ marginTop: 20 + "px" }}>
        <CardBody>
          <CardTitle>
            <h5>Ürünler</h5>
          </CardTitle>
        </CardBody>
        <Table bordered striped>
          <thead>
            <tr>
              <th>
                <small>Id</small>
              </th>
              <th>
                <small>İsim</small>
              </th>
              <th>
                <small>Fiyat</small>
              </th>
              <th>
                <small>Oluştuma Zamanı</small>
              </th>
              <th>
                <small>Eylemler</small>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.createdAt}</td>
                <td>
                  <Link to={"/urunler/" + product.id}>
                    <FaEdit className="text-primary h5"></FaEdit>
                  </Link>
              
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
