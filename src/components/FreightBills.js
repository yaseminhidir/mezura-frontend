import API from "../api";
import {  Table, Card, CardTitle, CardBody } from "reactstrap";
import {NavLink, Link} from "react-router-dom"
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

async function getFreightBills() {
  var res = await API.FreightBillApi.freightbillsBillsGet();
  return res.data.data;
}
export default function FreightBills() {
  var [freightBills, setFreightBill] = useState([]);
  useEffect(async () => {
    var freightBills = await getFreightBills();
    setFreightBill(freightBills);
    console.log(freightBills)
  }, []);
  return (
    <div>
      <NavLink to="irsaliyeler/yeniekle" className="btn btn-success btn-sm">
        Yeni İrsaliye Ekle
      </NavLink>
      <Card style={{ marginTop: 20 + "px" }}>
        <CardBody>
          <CardTitle>
            <h5>İrsaliyeler</h5>
          </CardTitle>
        </CardBody>
        <Table bordered striped responsive>
          <thead>
            <tr>
              <th>
                <small>Id</small>
              </th>
              <th>
                <small>İsim</small>
              </th>
              <th>
                <small>Kod</small>
              </th>
              <th>
                <small>Cari</small>
              </th>
              <th>
                <small>Proje</small>
              </th>
              <th>
                <small>İndirim Öncesi</small>
              </th>
              <th>
                <small>İndirim </small>
              </th>
              <th>
                <small>KDV </small>
              </th>
              <th>
                <small>Toplam</small>
              </th>
              <th>
                <small>Kur</small>
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
            {freightBills.map((freightBill) => (
              <tr key={freightBill.id}>
                <th scope="row">{freightBill.id}</th>
                <td>{freightBill.name}</td>
                <td>{freightBill.code}</td>
                <td>{freightBill.account.name}</td>
                <td></td>
                <td>{freightBill.grossTotal} TL</td>
                <td>{freightBill.discountTotal} TL</td>
                <td>{freightBill.taxTotal} TL</td>
                <td>{freightBill.total} TL</td>
                <td>{freightBill.currency.dispLayName}</td>
                <td>{freightBill.createdAt}</td>
                <td>
                  <Link to={"/irsaliyeler/" + freightBill.id}>
                  <FaEdit className="text-primary h5"></FaEdit>
                  </Link>
                  <FaTrashAlt className="text-danger h5"></FaTrashAlt>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
      </Card>
    </div>
  );
}