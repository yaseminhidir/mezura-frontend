import React, { Component, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { NavLink } from "react-router-dom";

export default function () {
  var [cariler, setCariler] = useState(false);
  var [hesaplar, setHesaplar] = useState(false);
  var [urunler, setUrunler] = useState(false);

  return (
    <div>
      <ListGroup>
        <ListGroupItem active={cariler}>
          <NavLink
            exact={true}
            activeClassName=""
            className={(state) => {
              setCariler(state);
              return "";
            }}
            to="/cariler"
          >
            Cariler
          </NavLink>
        </ListGroupItem>
        <ListGroupItem active={hesaplar}>
          <NavLink
            exact={true}
            activeClassName=""
            className={(state) => {
              setHesaplar(state);
              return "";
            }}
            to="/hesaplar"
          >
            Hesaplar
          </NavLink>
        </ListGroupItem>
        <ListGroupItem active={urunler}>
          {" "}
          <NavLink
            exact={true}
            activeClassName=""
            className={(state) => {
              setUrunler(state);
              return "";
            }}
            to="/urunler"
          >
            Ürünler
          </NavLink>
        </ListGroupItem>
        <ListGroupItem>Kullanıcılar</ListGroupItem>
        <ListGroupItem>İrsaliyeler</ListGroupItem>
        <ListGroupItem>Çıkış Yap</ListGroupItem>
      </ListGroup>
    </div>
  );
}
