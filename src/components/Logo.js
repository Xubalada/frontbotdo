import React, { Component } from "react";
import logo from "../images/logo.png";
import "./Logo.css";

class Logo extends Component {
  render() {
    return (
      <div>
        <div className="Title">
          <h1>
            D
            <img src={logo} width="44px" />
            fus Bot
          </h1>
        </div>
      </div>
    );
  }
}

export default Logo;
