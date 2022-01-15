import React, { Component } from "react";
import {Navbar, NavbarBrand} from "reactstrap"

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <div style={{marginBottom:20+'px'}}>
          <Navbar color="light" expand="md" light>
            <NavbarBrand href="/">Mezura</NavbarBrand>
         
          </Navbar>
        </div>
      </div>
    );
  }
}
