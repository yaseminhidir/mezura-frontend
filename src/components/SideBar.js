import React, { Component, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { NavLink } from "react-router-dom";

export default function () {
  var [cariler, setCariler] = useState(false);

  var [urunler, setUrunler] = useState(false);
  var [irsaliyeler, setIrsaliyeler] = useState(false);

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
   
        <ListGroupItem active={irsaliyeler}>
          {" "}
          <NavLink
            to="/irsaliyeler"
            exact={true}
            activeClassName=""
            className={(state) => {
              setIrsaliyeler(state);
              return "";
            }}
            to="/irsaliyeler"
          >
            {" "}
            İrsaliyeler{" "}
          </NavLink>
        </ListGroupItem>
   
      </ListGroup>
    </div>
  );
}
