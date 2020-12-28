import React, { Component } from "react";
import "./Selections.css";
import Select from "react-select";
import { getResources } from "./Api";
import { getMonsters } from "./Api";

class Selections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monsters: [],
      selectedMonsters: [],
      resources: [],
      selectedResources: [],
      selection: "resources",
    };
    this.onChangeValue = this.onChangeValue.bind(this);
    this.renderSelection = this.renderSelection.bind(this);
  }

  render() {
    return (
      <div className="selectionsBox">
        <h1 id="Title">OPTIONS</h1>
        <div
          className="modeSelect"
          onChange={(event) => this.onChangeValue(event)}
        >
          <label id="radios">
            <input
              type="radio"
              value="resources"
              name="modeSelect"
              checked={this.state.selection === "resources"}
              onChange={() => null}
            />
            Resources
          </label>
          <label id="radios">
            <input
              type="radio"
              value="monsters"
              name="modeSelect"
              checked={this.state.selection === "monsters"}
              onChange={() => null}
            />
            Monsters
          </label>
        </div>
        {this.renderSelection()}
      </div>
    );
  }

  onChangeValue(event) {
    this.setState({ selection: event.target.value });
  }

  renderSelection() {
    if (this.state.selection === "resources")
      return (
        <Select
          key="resources"
          isMulti
          options={this.state.resources}
          defaultValue={this.state.selectedResources}
          onChange={(selectedItems) =>
            this.setState({ selectedResources: selectedItems })
          }
        />
      );
    if (this.state.selection === "monsters")
      return (
        <Select
          key="monsters"
          isMulti
          options={this.state.monsters}
          defaultValue={this.state.selectedMonsters}
          onChange={(selectedItems) =>
            this.setState({ selectedMonsters: selectedItems })
          }
        />
      );
  }

  componentWillMount() {
    getResources()
      .then((value) => {
        this.setState({ resources: value });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    getMonsters()
      .then((value) => {
        this.setState({ monsters: value });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
}

export default Selections;
