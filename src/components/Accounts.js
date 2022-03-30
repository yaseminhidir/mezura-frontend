import API from "../api";
import { Table, Card, CardTitle, CardBody } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import alertify from "alertifyjs"

async function getAccounts() {
  var res = await API.AccountApi.accountAccountsGet();
  
  return res.data.data;
}

async function deleteAccount(id){
  var res=await API.AccountApi.accountAccountsIdDeleteDelete(id);
  if(res.data.success){
    alertify.success("Başarıyla Silindi")
  }
  else{
    alertify.error(res.data.error)
  }
}

export default function Cariler({}) {
  var [accounts, setAccounts] = useState([]);
  useEffect(async () => {
    var accounts = await getAccounts();
    setAccounts(accounts);
  }, []);
  return (
    <div>
      <NavLink to="cariler/yeniekle" className="btn btn-success btn-sm">
        Yeni Cari Ekle
      </NavLink>
      <Card style={{ marginTop: 20 + "px" }}>
        <CardBody>
        <CardTitle>
          <h5>Cariler</h5>
        </CardTitle>
        </CardBody>
        <Table bordered striped>
          <thead>
            <tr>
              <th><small>Id</small></th>
              <th><small>İsim</small></th>
              <th><small>Oluştuma Zamanı</small></th>
              <th><small>Eylemler</small></th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id}>
                <th scope="row">{account.id}</th>
                <td>{account.name}</td>
                <td>{account.createdAt}</td>
                <td>
                  <Link to={"/cariler/" + account.id}>
                    <FaEdit className="text-primary h5"></FaEdit>
                  </Link>
                  <FaTrashAlt style={{cursor:"pointer"}} onClick={(e)=>deleteAccount(account.id)} className="text-danger h5"></FaTrashAlt>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
       
      </Card>
    </div>
  );
}
