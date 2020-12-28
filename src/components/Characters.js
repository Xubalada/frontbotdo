import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import "./Characters.css";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import trash from "../images/trash2.png";
import check from "../images/check.png";
import add from "../images/add.png";
import ap from "../images/tx_actionPoints.png";
import pm from "../images/tx_movementPoints.png";
import range from "../images/tx_range.png";
import vit from "../images/tx_health.png";
import resAgi from "../images/tx_res_air.png";
import resChance from "../images/tx_res_water.png";
import resStrength from "../images/tx_res_earth.png";
import resInt from "../images/tx_res_fire.png";
import resNeutral from "../images/tx_res_neutral.png";
import wisdom from "../images/tx_carac_wisdom.png";
import crit from "../images/tx_crit.png";
import stamina from "../images/tx_stamina.png";
import mineiro from "../images/mineiro.jpg";
import pescador from "../images/pescador.jpg";
import sapateiro from "../images/sapateiro.jpg";
import lenhador from "../images/lenhador.jpg";
import joalheiro from "../images/joalheiro.jpg";
import handyman from "../images/handyman.jpg";
import ferreiro from "../images/ferreiro.jpg";
import farmer from "../images/farmer.jpg";
import escultor from "../images/esultor.jpg";
import escudo from "../images/escudo.jpg";
import cacador from "../images/cacador.jpg";
import alquimista from "../images/alquimista.jpg";
import alfaiate from "../images/alfaiate.jpg";
import prospec from "../images/tx_prospecting.png";

class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      infoTableIndex: null,
      accounts: [],
      tempPassword: "",
      tempLogin: "",
      tempCharacter: "",
      selectedServer: "",
      serversList: [
        { value: "36", label: "Agride" },
        { value: "205", label: "Meriana" },
        { value: "22", label: "Oto-Mustam" },
        { value: "203", label: "Rubilax" },
        { value: "206", label: "Pandore" },
        { value: "50", label: "Ombre" },
        { value: "204", label: "Atcham" },
        { value: "207", label: "Ush" },
        { value: "211", label: "Furye" },
        { value: "201", label: "Echo" },
        { value: "209", label: "Nidas" },
        { value: "208", label: "Julith" },
        { value: "210", label: "Merkator" },
        { value: "212", label: "Brumen" },
        { value: "202", label: "Crocabulia" },
        { value: "240", label: "Jahash" },
      ],
    };
    this.addNewCharacter = this.addNewCharacter.bind(this);
    this.addNewCharacterResponseHandler = this.addNewCharacterResponseHandler.bind(
      this
    );
    this.renderInfoTabel = this.renderInfoTabel.bind(this);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
  }
  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({
      visible: false,
    });
  }

  addNewCharacterResponseHandler(response) {
    let data = response.data;
    if (data === "blank") {
      alert("Please fulfill all the inputs ");
      this.show();
      return;
    } else if (data == "notFound") {
      alert("Character not Found");
      this.show();
      return;
    }
    data["login"] = this.state.tempLogin;
    data["password"] = this.state.tempPassword;
    this.setState({
      tempPassword: "",
      tempLogin: "",
      tempCharacter: "",
    });
    let newAcconts = this.state.accounts.concat(data);
    this.setState({ accounts: newAcconts });
    console.log(this.state);
  }

  addNewCharacter() {
    this.hide();
    axios
      .post("http://127.0.0.1:5000/bot_api/character_info", {
        login: this.state.tempLogin,
        password: this.state.tempPassword,
        character: this.state.tempCharacter,
        server: this.state.selectedServer,
      })
      .then((response) => this.addNewCharacterResponseHandler(response));
  }

  renderCharacters() {
    return this.state.accounts.map((item, index) => {
      return (
        <div
          id="characterCell"
          key={index}
          onMouseEnter={() => this.setState({ infoTableIndex: index })}
          onMouseLeave={() => this.setState({ infoTableIndex: null })}
        >
          <div id="characterImage">
            <img
              width="100%"
              src={`data:image/png;base64,${this.state.accounts[index].avatarImage}`}
            />
          </div>
          <div className="characterCellInfoContainer">
            <h1 id="characterCellInfoContent">
              Name: {this.state.accounts[index].name}
            </h1>
            <h1 id="characterCellInfoContent">
              Class: {this.state.accounts[index].class}
            </h1>
            <h1 id="characterCellInfoContent">
              Level: {this.state.accounts[index].level}
            </h1>
          </div>
          <div className="delButtomCell">
            <img
              src={trash}
              width="100%"
              onClick={() => {
                console.log(index);
                let newAccounts = this.state.accounts;
                newAccounts.splice(index, 1);
                this.setState({ accounts: newAccounts });
                console.log(this.state.accounts);
              }}
            />
          </div>
        </div>
      );
    });
  }

  renderAddButtom() {
    if (this.state.accounts.length < 8) {
      return (
        <div>
          <div
            id="newCharacterCell"
            onClick={() => {
              if (this.state.selectedServer !== "") {
                this.show();
              } else {
                alert("Select a server");
              }
            }}
          >
            <img src={add} width="100%" />
          </div>
          <Rodal
            visible={this.state.visible}
            onClose={this.hide}
            className="rodal"
            width={250}
            height={270}
            customStyles={{ backgroundColor: "#181010" }}
          >
            <div className="modalContainer">
              <h1 className="formTitle">New Character</h1>
              <form>
                <label>
                  <div className="inputContainer">
                    <h1 className="inputTitle">Login:</h1>
                    <input
                      id="input"
                      type="text"
                      value={this.state.tempLogin}
                      onChange={(event) =>
                        this.setState({ tempLogin: event.target.value })
                      }
                    />
                  </div>
                  <div className="inputContainer">
                    <h1 className="inputTitle">Password:</h1>
                    <input
                      id="input"
                      value={this.state.tempPassword}
                      type="text"
                      onChange={(event) =>
                        this.setState({ tempPassword: event.target.value })
                      }
                    />
                  </div>
                  <div className="inputContainer">
                    <h1 className="inputTitle">Character:</h1>
                    <input
                      id="input"
                      value={this.state.tempCharacter}
                      type="text"
                      onChange={(event) =>
                        this.setState({ tempCharacter: event.target.value })
                      }
                    />
                  </div>
                </label>
                <div className="delButtom" onClick={this.hide.bind(this)}>
                  <img src={trash} width="100%" />
                </div>
                <div
                  type="submit"
                  className="checkButtom"
                  onClick={this.addNewCharacter}
                >
                  <img src={check} width="100%" />
                </div>
              </form>
            </div>
          </Rodal>
        </div>
      );
    }
  }

  renderJobLevel(jobName, index) {
    if (jobName in this.state.accounts[index].professions) {
      return this.state.accounts[index].professions[jobName];
    } else {
      return "-";
    }
  }

  renderInfoTabel() {
    if (this.state.infoTableIndex === null) {
      return (
        <div className="info-table-content">
          <table id="group-content">
            <tbody>
              <tr id="division-tr">
                <td>
                  <img width="70px" height="70px" src={prospec} />
                </td>
                <td>
                  <h1 className="level-prospec">
                    {this.state.accounts.reduce(
                      (acumulate, object) =>
                        acumulate +
                        Number(object.secundaryCharacteristics.Prospecting),
                      0
                    )}
                  </h1>
                </td>
                <td>
                  <h1 id="level-title">Lvl:</h1>
                </td>
                <td>
                  <h1 className="level-prospec">
                    {this.state.accounts.reduce(
                      (acumulate, object) => acumulate + Number(object.level),
                      0
                    )}
                  </h1>
                </td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="infoTable">
          <div id="profile-image">
            <img
              width="100%"
              src={`data:image/png;base64,${
                this.state.accounts[this.state.infoTableIndex].fullSizeImage
              }`}
            />
          </div>
          <div id="character-info">
            <table>
              <tbody>
                <tr>
                  <td>
                    <img width="30px" height="30px" src={ap} />
                  </td>
                  <td className="characteristics-info">
                    {
                      this.state.accounts[this.state.infoTableIndex]
                        .primaryCharacteristics.AP
                    }
                  </td>
                  <td>
                    <img width="25px" height="25px" src={resAgi} />
                  </td>
                  <td className="characteristics-info">
                    {
                      this.state.accounts[this.state.infoTableIndex]
                        .primaryCharacteristics.Agility
                    }
                  </td>
                  <td>
                    <img width="25px" height="25px" src={wisdom} />
                  </td>
                  <td className="characteristics-info">
                    {
                      this.state.accounts[this.state.infoTableIndex]
                        .primaryCharacteristics.Wisdom
                    }
                  </td>
                </tr>
                <tr>
                  <td>
                    <img width="30px" height="30px" src={pm} />
                  </td>
                  <td className="characteristics-info">
                    {
                      this.state.accounts[this.state.infoTableIndex]
                        .primaryCharacteristics.MP
                    }
                  </td>
                  <td>
                    <img width="25px" height="25px" src={resChance} />
                  </td>
                  <td className="characteristics-info">
                    {
                      this.state.accounts[this.state.infoTableIndex]
                        .primaryCharacteristics.Chance
                    }
                  </td>
                  <td>
                    <img width="25px" height="25px" src={stamina} />
                  </td>
                  <td className="characteristics-info">
                    {
                      this.state.accounts[this.state.infoTableIndex]
                        .primaryCharacteristics.Power
                    }
                  </td>
                </tr>
                <tr>
                  <td>
                    <img width="30px" height="30px" src={range} />
                  </td>
                  <td className="characteristics-info">
                    {
                      this.state.accounts[this.state.infoTableIndex]
                        .primaryCharacteristics.Range
                    }
                  </td>
                  <td>
                    <img width="25px" height="25px" src={resStrength} />
                  </td>
                  <td className="characteristics-info">
                    {
                      this.state.accounts[this.state.infoTableIndex]
                        .primaryCharacteristics.Strength
                    }
                  </td>
                  <td>
                    <img width="25px" height="25px" src={crit} />
                  </td>
                  <td className="characteristics-info">
                    {
                      this.state.accounts[this.state.infoTableIndex]
                        .primaryCharacteristics.Critical
                    }
                  </td>
                </tr>
                <tr>
                  <td>
                    <img width="25px" height="25px" src={vit} />
                  </td>
                  <td className="characteristics-info">
                    {
                      this.state.accounts[this.state.infoTableIndex]
                        .primaryCharacteristics.Vitality
                    }
                  </td>
                  <td>
                    <img width="25px" height="25px" src={resInt} />
                  </td>
                  <td className="characteristics-info">
                    {
                      this.state.accounts[this.state.infoTableIndex]
                        .primaryCharacteristics.Intelligence
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="character-resists">
            <table>
              <tbody>
                <tr>
                  <td>
                    <img width="25px" height="25px" src={resNeutral} />
                  </td>
                  <td className="character-resists-info">
                    {
                      this.state.accounts[this.state.infoTableIndex]
                        .resistences["Neutral (fixed)"]
                    }
                  </td>
                  <td>
                    <img width="25px" height="25px" src={resNeutral} />
                  </td>
                  <td className="character-resists-info">
                    {this.state.accounts[this.state.infoTableIndex].resistences[
                      "Neutral (%)"
                    ] + "%"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <img width="25px" height="25px" src={resStrength} />
                  </td>
                  <td className="character-resists-info">
                    {
                      this.state.accounts[this.state.infoTableIndex]
                        .resistences["Earth (fixed)"]
                    }
                  </td>
                  <td>
                    <img width="25px" height="25px" src={resStrength} />
                  </td>
                  <td className="character-resists-info">
                    {this.state.accounts[this.state.infoTableIndex].resistences[
                      "Earth (%)"
                    ] + "%"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <img width="25px" height="25px" src={resAgi} />
                  </td>
                  <td className="character-resists-info">
                    {
                      this.state.accounts[this.state.infoTableIndex]
                        .resistences["Air (fixed)"]
                    }
                  </td>
                  <td>
                    <img width="25px" height="25px" src={resAgi} />
                  </td>
                  <td className="character-resists-info">
                    {this.state.accounts[this.state.infoTableIndex].resistences[
                      "Air (%)"
                    ] + "%"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <img width="25px" height="25px" src={resChance} />
                  </td>
                  <td className="character-resists-info">
                    {
                      this.state.accounts[this.state.infoTableIndex]
                        .resistences["Water (fixed)"]
                    }
                  </td>
                  <td>
                    <img width="25px" height="25px" src={resChance} />
                  </td>
                  <td className="character-resists-info">
                    {this.state.accounts[this.state.infoTableIndex].resistences[
                      "Water (%)"
                    ] + "%"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <img width="25px" height="25px" src={resInt} />
                  </td>
                  <td className="character-resists-info">
                    {
                      this.state.accounts[this.state.infoTableIndex]
                        .resistences["Fire (fixed)"]
                    }
                  </td>
                  <td>
                    <img width="25px" height="25px" src={resInt} />
                  </td>
                  <td className="character-resists-info">
                    {this.state.accounts[this.state.infoTableIndex].resistences[
                      "Fire (%)"
                    ] + "%"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="character-profs">
            <table>
              <tbody>
                <tr>
                  <td>
                    <img
                      width="25px"
                      height="25px"
                      src={alfaiate}
                      title="Tailor"
                    />
                  </td>
                  <td className="job-level">
                    {this.renderJobLevel("Tailor", this.state.infoTableIndex)}
                  </td>
                  <td>
                    <img
                      width="25px"
                      height="25px"
                      src={escudo}
                      title="Artificer"
                    />
                  </td>
                  <td className="job-level">
                    {this.renderJobLevel(
                      "Artificer",
                      this.state.infoTableIndex
                    )}
                  </td>
                  <td>
                    <img
                      width="25px"
                      height="25px"
                      src={cacador}
                      title="Hunter"
                    />
                  </td>
                  <td className="job-level">
                    {this.renderJobLevel("Hunter", this.state.infoTableIndex)}
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      width="25px"
                      height="25px"
                      src={ferreiro}
                      title="Smith"
                    />
                  </td>
                  <td className="job-level">
                    {this.renderJobLevel("Smith", this.state.infoTableIndex)}
                  </td>
                  <td>
                    <img
                      width="25px"
                      height="25px"
                      src={escultor}
                      title="Carver"
                    />
                  </td>
                  <td className="job-level">
                    {this.renderJobLevel("Carver", this.state.infoTableIndex)}
                  </td>
                  <td>
                    <img
                      width="25px"
                      height="25px"
                      src={lenhador}
                      title="Lumberjack"
                    />
                  </td>
                  <td className="job-level">
                    {this.renderJobLevel(
                      "Lumberjack",
                      this.state.infoTableIndex
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      width="25px"
                      height="25px"
                      src={sapateiro}
                      title="Shoemaker"
                    />
                  </td>
                  <td className="job-level">
                    {this.renderJobLevel(
                      "Shoemaker",
                      this.state.infoTableIndex
                    )}
                  </td>
                  <td>
                    <img
                      width="25px"
                      height="25px"
                      src={alquimista}
                      title="Alchemist"
                    />
                  </td>
                  <td className="job-level">
                    {this.renderJobLevel(
                      "Alchemist",
                      this.state.infoTableIndex
                    )}
                  </td>
                  <td>
                    <img
                      width="25px"
                      height="25px"
                      src={mineiro}
                      title="Miner"
                    />
                  </td>
                  <td className="job-level">
                    {this.renderJobLevel("Miner", this.state.infoTableIndex)}
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      width="25px"
                      height="25px"
                      src={joalheiro}
                      title="Jeweller"
                    />
                  </td>
                  <td className="job-level">
                    {this.renderJobLevel("Jeweller", this.state.infoTableIndex)}
                  </td>
                  <td>
                    <img
                      width="25px"
                      height="25px"
                      src={farmer}
                      title="Farmer"
                    />
                  </td>
                  <td className="job-level">
                    {this.renderJobLevel("Farmer", this.state.infoTableIndex)}
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      width="25px"
                      height="25px"
                      src={handyman}
                      title="Handyman"
                    />
                  </td>
                  <td className="job-level">
                    {this.renderJobLevel("Handyman", this.state.infoTableIndex)}
                  </td>
                  <td>
                    <img
                      width="25px"
                      height="25px"
                      src={pescador}
                      title="Fisher"
                    />
                  </td>
                  <td className="job-level">
                    {this.renderJobLevel("Fisher", this.state.infoTableIndex)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderInfoTabel()}
        <div className="characterBox">
          <h1 id="titleCharacterBox">CHARACTERS</h1>
          <div className="serverSelect">
            <h1 id="selectTitle">Server:</h1>
            <Select
              id="select"
              key="servers"
              options={this.state.serversList}
              defaultValue={this.state.selectedServer}
              onChange={(selectedItem) =>
                this.setState({ selectedServer: selectedItem.value })
              }
            />
          </div>
          <div className="characterBoxContent">
            {this.renderCharacters()}
            {this.renderAddButtom()}
          </div>
        </div>
      </div>
    );
  }
}

export default Characters;
