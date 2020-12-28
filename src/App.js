import React, { Component } from "react";
import Logo from "./components/Logo";
import Characters from "./components/Characters";
import Selection from "./components/Selections";
import "./App.css";
import start from "./images/start.gif";
import stopStart from "./images/stopStart.gif";
import started from "./images/started.gif";
import { isEmpty } from "underscore";
const axios = require("axios");
// var remote = window.require("electron").remote;

class App extends Component {
  constructor(props) {
    super(props);
    this.selectsRef = React.createRef();
    this.accountsRef = React.createRef();
    this.state = {
      status: 1,
      showPopup: false,
    };
    this.checkAndSend.bind(this);
  }

  checkAndSend(acc, mod, select) {
    if (isEmpty(select)) {
      alert("Please Select a Monster or a Resource");
      return;
    } else if (isEmpty(acc)) {
      alert("Please Select a Character");
      return;
    } else {
      console.log({
        accounts: acc,
        mode: mod,
        selects: select,
      });
      axios.post("http://127.0.0.1:5000/bot_api/selected_data", {
        accounts: acc,
        mode: mod,
        selects: select,
      });
    }
  }

  render() {
    return (
      <div>
        <Logo />
        <div id="menu">
          <Selection ref={this.selectsRef} />
          <Characters ref={this.accountsRef} />
          <div
            id="start"
            onClick={() => {
              const mode = this.selectsRef.current.state["selection"];
              const select = "selected" + mode[0].toUpperCase() + mode.slice(1);
              this.checkAndSend(
                this.accountsRef.current.state.accounts,
                mode,
                this.selectsRef.current.state[select]
              );
            }}
          >
            <img
              className="startbuttom"
              src={stopStart}
              onMouseOver={(event) => {
                event.currentTarget.src = start;
              }}
              onMouseOut={(event) => {
                event.currentTarget.src = stopStart;
              }}
              onClick={(event) => {
                event.currentTarget.src = started;
              }}
              width="150px"
              height="150px"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
