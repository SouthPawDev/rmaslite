import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import CheckboxShift from "./Components/Checkbox";
import { Title, Time, FlightException, Misc } from "./Components/Stateless";
import FlightTableB from "./Components/FlightTableB";
import Button from "react-bootstrap/Button";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      direction: true,
      data: [],
      flightStatus: [],
      shiftBools: {},
      sizing: false,
      refresh: false,
      selected: false
    };
  }

  componentDidMount() {
    this.getFile();
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
  }

  async getFile() {
    let location = this.props.location.pathname;
    let formatLocation =
      location.slice(-5) === "INLET" || location.slice(-5) === "DEICE"
        ? location.slice(1, -6)
        : location.slice(1);

    fetch(
      `http://wtc-275124-w23.corp.ds.fedex.com:9091/file/serve?file=${formatLocation}.csv`
    )
      .then(response =>
        response.json().then(data => {
          this.setState({
            flightType: data[1].split(",")[0],
            shiftOne: data[0]
              .split(",")
              .filter((item, i) => i > 1 && i < 4 && item.trim() !== ""),
            shiftTwo: data[1]
              .split(",")
              .filter((item, i) => i > 1 && i < 4 && item.trim() !== ""),
            shiftThree: data[2]
              .split(",")
              .filter((item, i) => i > 1 && i < 4 && item.trim() !== ""),
            rmas: [
              data[0].split(",")[0],
              data[1].split(",")[0],
              data[2].split(",")[0]
            ],
            misc: data[3].split(","),
            maints: data[2].split(",").filter(i => i.includes("Maint"))[0],
            spares: data[2].split(",").filter(i => i.includes("Spare"))[0],
            opens: data[2].split(",").filter(i => i.includes("Open"))[0],
            shiftBools: {
              shiftOne: data[0].split(",")[1].slice(0, 1) === "X",
              shiftTwo: data[1].split(",")[1].slice(0, 1) === "X",
              shiftThree: data[2].split(",")[1].slice(0, 1) === "X"
            },
            fileLines: data,
            columnTitles: data[4]
              .split(",")
              .filter(item => item !== "NULL" || item !== " "),
            fileLinesContent: data
              .filter(
                (item, i) =>
                  i > 5 &&
                  item.match(/^\w/) &&
                  item !== "NULL" &&
                  item.trim() !== ""
              )
              .map((j, k) => {
                if (k === 0) {
                }
                let obj = {};
                for (var h = 0; h < data[4].length; h++) {
                  obj[data[4].split(",")[h]] = j.split(",")[h];
                }
                return obj;
              }),
            currentTime: data[0].split(",")[6],
            direction: true
          });
        })
      )
      .then(() => {
        this.filter();
      })
      .then(() => {
        let location = this.props.location.pathname.split("/");
        if (location.length === 4) {
          if (location[3] === "DEICE") {
            let columns = this.state.currentColumnTitles;
            let index = columns.indexOf("DILOC;BBW");
            this.onSort(columns[index]);
          } else {
            let columns = this.state.currentColumnTitles;
            let index = columns.indexOf("IREQ;BBW");
            this.onSort(columns[index]);
          }
        } else {
          let data = this.state.misc;
          let columns = this.state.currentColumnTitles;
          let index = data.indexOf("^^^^^");
          this.onSort(columns[index]);
        }
      });
  }

  filter() {
    this.setState({
      currentColumnTitles: this.state.columnTitles,
      currentFileLinesContent: this.state.fileLinesContent.reduce(
        (acc, c, i) => {
          let shiftOneDay = this.state.shiftOne ? this.state.shiftOne[0] : "";
          let shiftTwoDay = this.state.shiftTwo ? this.state.shiftTwo[0] : "";
          let shiftThreeDay = this.state.shiftThree
            ? this.state.shiftThree[0]
            : "";
          let weekDay = c["SHIFT;BBW"].split(";")[0].replace("_", "-");

          if (this.state.shiftBools["shiftOne"]) {
            if (shiftOneDay.includes(weekDay)) {
              acc.push(c);
            }
          }
          if (this.state.shiftBools["shiftTwo"]) {
            if (shiftTwoDay.includes(weekDay)) {
              acc.push(c);
            }
          }
          if (this.state.shiftBools["shiftThree"]) {
            if (shiftThreeDay.includes(weekDay)) {
              acc.push(c);
            }
          }

          return acc;
        },
        []
      )
    });
  }

  refresh() {
    this.setState(
      {
        refresh: !this.state.refresh
      },
      () => {
        if (this.state.refresh) {
          let location = this.props.location.pathname;
          let formatLocation =
            location.slice(-5) === "INLET" || location.slice(-5) === "DEICE"
              ? location.slice(1, -6)
              : location.slice(1);

          this.setState({
            timer: setInterval(() => {
              fetch(
                `http://wtc-275124-w23.corp.ds.fedex.com:9091/file/serve?file=${formatLocation}.csv`
              ).then(response =>
                response.json().then(data => {
                  if (
                    JSON.stringify(data) ===
                    JSON.stringify(this.state.fileLines)
                  ) {
                    console.log("Data unchanged.");
                  } else {
                    this.getFile();
                    console.log("Different Data Detected");
                  }
                })
              );
            }, 15000)
          });
        } else {
          clearInterval(this.state.timer);
        }
      }
    );
  }

  sizing() {
    this.setState(
      {
        sizing: !this.state.sizing
      },
      () => {
        if (this.state.sizing) {
          document.getElementsByClassName("App")[0].style.width = "100%";
          let c = document.getElementsByTagName("*");
          for (let i = 0; i < c.length; i++) {
            c.item(i).classList.add("resizable");
          }
        } else {
          document.getElementsByClassName("App")[0].style.width = "1680px";
          let c = document.getElementsByTagName("*");
          for (let i = 0; i < c.length; i++) {
            c.item(i).classList.remove("resizable");
          }
        }
      }
    );
  }

  reset() {
    this.getFile();
    let y = document.getElementsByTagName("tr");
    for (let i = 0; i < y.length; i++) {
      y.item(i).classList.remove("selected");
      y.item(i).classList.remove("hidden");
    }
  }

  showSelected() {
    let x = document.getElementsByTagName("tr");
    let y = document.getElementsByClassName("selected");

    if (y.length > 0) {
      for (var i = 1; i < x.length; i++) {
        if (!x.item(i).classList.contains("selected")) {
          x.item(i).classList.add("hidden");
        } else {
          if (x.item(i).classList.contains("hidden")) {
            x.item(i).classList.remove("hidden");
          }
        }
      }
    }
  }

  hideSelected() {
    let x = document.getElementsByTagName("tr");
    // let y = document.getElementsByClassName("selectedRow");

    for (var i = 1; i < x.length; i++) {
      if (x.item(i).classList.contains("selected")) {
        x.item(i).classList.add("hidden");
      } else {
        if (x.item(i).classList.contains("hidden")) {
          x.item(i).classList.remove("hidden");
        }
      }
    }
  }

  handleColumnExceptionSort(column) {
    let direction = this.state.direction;
    let sortedData = this.state.currentFileLinesContent.sort((a, b) => {
      let nameA = a[column]
        .split(";")[0]
        .toUpperCase()
        .trim();
      let nameB = b[column]
        .split(";")[0]
        .toUpperCase()
        .trim();
      if (nameA === "") {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      if (nameA === nameB) {
        if (a["FLIGHT;BBW"]) {
          nameA = a["FLIGHT;BBW"]
            .split(";")[0]
            .toUpperCase()
            .trim();
          nameB = b["FLIGHT;BBW"]
            .split(";")[0]
            .toUpperCase()
            .trim();
          if (nameA === "") {
            return 1;
          }
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        }
      }
      return 0;
    });

    if (!direction) {
      sortedData.reverse();
    }

    this.setState({
      currentFileLinesContent: sortedData,
      direction: !this.state.direction
    });
  }

  handleFlightSort() {
    let direction = this.state.direction;
    let sortedData = this.state.currentFileLinesContent.sort((a, b) => {
      let nameA = a["FLIGHT;BBW"]
        .split(";")[0]
        .toUpperCase()
        .trim();
      let nameB = b["FLIGHT;BBW"]
        .split(";")[0]
        .toUpperCase()
        .trim();
      if (nameA === "") {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      if (nameA === nameB) {
        if (a["GATE;BBW"]) {
          nameA = a["GATE;BBW"]
            .split(";")[0]
            .toUpperCase()
            .trim();
          nameB = b["GATE;BBW"]
            .split(";")[0]
            .toUpperCase()
            .trim();
          if (nameA === "") {
            return 1;
          }
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        }
      }
      return 0;
    });

    if (!direction) {
      sortedData.reverse();
    }

    this.setState({
      currentFileLinesContent: sortedData,
      direction: !this.state.direction
    });
  }

  onSort(column) {
    this.setState({ isSorted: column });
    if (column === "FLIGHT;BBW") {
      this.setState({ isSecondarySorted: "GATE;BBW" });

      this.handleFlightSort();
    } else if (
      column === "AC;BBW" ||
      column === "GATE;BBW" ||
      column === "STA;BBW" ||
      column === "STD;BBW"
    ) {
      this.setState({ isSecondarySorted: "FLIGHT;BBW" });

      this.handleColumnExceptionSort(column);
    } else {
      let type = this.state.rmas[1].split(";")[0];
      type === "INBOUND"
        ? this.setState({ isSecondarySorted: "STA;BBW" })
        : this.setState({ isSecondarySorted: "STD;BBW" });

      let direction = this.state.direction;

      let sortedData = this.state.currentFileLinesContent.sort((a, b) => {
        let nameA = a[column]
          .split(";")[0]
          .toUpperCase()
          .trim();
        let nameB = b[column]
          .split(";")[0]
          .toUpperCase()
          .trim();

        if (nameA === "") {
          return 1;
        }
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        if (nameA === nameB) {
          if (type === "INBOUND") {
            if (a["STA;BBW"]) {
              nameA = a["STA;BBW"]
                .split(";")[0]
                .toUpperCase()
                .trim();
              nameB = b["STA;BBW"]
                .split(";")[0]
                .toUpperCase()
                .trim();
              if (nameA === "") {
                return 1;
              }
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
            }
          } else {
            if (a["STD;BBW"]) {
              nameA = a["STD;BBW"]
                .split(";")[0]
                .toUpperCase()
                .trim();
              nameB = b["STD;BBW"]
                .split(";")[0]
                .toUpperCase()
                .trim();
              if (nameA === "") {
                return 1;
              }
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
            }
          }
        }

        return 0;
      });

      if (!direction) {
        sortedData.sort((a, b) => {
          let nameA = a[column]
            .split(";")[0]
            .toUpperCase()
            .trim();
          let nameB = b[column]
            .split(";")[0]
            .toUpperCase()
            .trim();
          if (nameA === "") {
            return 1;
          }
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
          if (nameA === nameB) {
            if (type === "INBOUND") {
              if (a["STA;BBW"]) {
                nameA = a["STA;BBW"]
                  .split(";")[0]
                  .toUpperCase()
                  .trim();
                nameB = b["STA;BBW"]
                  .split(";")[0]
                  .toUpperCase()
                  .trim();
                if (nameA === "") {
                  return 1;
                }
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
              }
            } else {
              if (a["STD;BBW"]) {
                nameA = a["STD;BBW"]
                  .split(";")[0]
                  .toUpperCase()
                  .trim();
                nameB = b["STD;BBW"]
                  .split(";")[0]
                  .toUpperCase()
                  .trim();
                if (nameA === "") {
                  return 1;
                }
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
              }
            }
          }
          return 0;
        });
      }

      this.setState({
        currentFileLinesContent: sortedData,
        direction: !this.state.direction
      });
    }
  }

  onCheck(name) {
    this.setState(
      {
        shiftBools: {
          ...this.state.shiftBools,
          [name]: !this.state.shiftBools[name]
        }
      },
      () => this.filter()
    );
  }

  handleOnMouseDownTh(e, column) {
    e.preventDefault();
    if (e.button === 1) {
      this.setState({
        currentColumnTitles: this.state.currentColumnTitles.filter(
          title => title !== column
        ),
        currentFileLinesContent: this.state.currentFileLinesContent.map(obj => {
          delete obj[column];
          return obj;
        })
      });
    }
  }

  handleRightClickTh(e, column) {
    e.preventDefault();
    document.getElementsByClassName("App")[0].focus();
    this.setState({
      selectedColumn: this.state.selectedColumn === column ? "" : column
    });
  }

  handleKeyPress(e) {
    if (this.state.selectedColumn) {
      if (e.keyCode === 37 || e.keyCode === 39) {
        e.preventDefault();
        let columns = this.state.currentColumnTitles;
        let columnsLength = columns.length;
        let selectedColumn = this.state.selectedColumn;
        let index = columns.indexOf(selectedColumn);
        let rows = this.state.currentFileLinesContent;

        if (e.keyCode === 37) {
          if (index > 0) {
            let tmp = columns[index];
            columns[index] = columns[index - 1];
            columns[index - 1] = tmp;

            let newRows = rows.map(obj => {
              let keys = Object.keys(obj);
              let keyTmp = keys[index];
              keys[index] = keys[index - 1];
              keys[index - 1] = keyTmp;
              let newObj = keys.reduce((o, c) => {
                o[c] = obj[c];
                return o;
              }, {});
              return newObj;
            });
            this.setState({
              currentColumnTitles: columns,
              currentFileLinesContent: newRows
            });
          }
        } else {
          if (index < columnsLength - 1) {
            let tmp = columns[index];
            columns[index] = columns[index + 1];
            columns[index + 1] = tmp;

            let newRows = rows.map(obj => {
              let keys = Object.keys(obj);
              let keyTmp = keys[index];
              keys[index] = keys[index + 1];
              keys[index + 1] = keyTmp;
              let newObj = keys.reduce((o, c) => {
                o[c] = obj[c];
                return o;
              }, {});
              return newObj;
            });
            this.setState({
              currentColumnTitles: columns,
              currentFileLinesContent: newRows
            });
          }
        }
      }
    }
  }

  handleClick(e) {
    e.preventDefault();
    if (e.button === 0) {
    }
    if (e.button === 1) {
      let x = e.target.parentElement.id;
      this.setState({
        currentFileLinesContent: this.state.currentFileLinesContent.filter(
          (i, j) => j !== parseInt(x)
        )
      });
    }
  }

  handlePrint() {
    document.getElementsByTagName("table")[0].style.height = "100%";
    window.print();
    document.getElementsByTagName("table")[0].style.height = "800px";
  }

  render() {
    const content = this.state.currentFileLinesContent
      ? this.state.currentFileLinesContent
      : [];
    const columns = this.state.currentColumnTitles
      ? this.state.currentColumnTitles
      : [];
    const misc = this.state.misc ? this.state.misc : "";
    const maints = this.state.maints ? this.state.maints : "";
    const spares = this.state.spares ? this.state.spares : "";
    const opens = this.state.opens ? this.state.opens : "";
    const currentTime = this.state.currentTime ? this.state.currentTime : "";
    const shiftBools = this.state.shiftBools ? this.state.shiftBools : "";
    const title = this.state.rmas ? this.state.rmas : "";
    const shiftOne = this.state.shiftOne ? this.state.shiftOne : "";
    const shiftTwo = this.state.shiftTwo ? this.state.shiftTwo : "";
    const shiftThree = this.state.shiftThree ? this.state.shiftThree : "";

    return (
      <div
        className="App"
        tabIndex="0"
        onKeyDown={this.handleKeyPress.bind(this)}
      >
        <div className="App-header">
          <div className="header-content">
            <div className="header-content-left">
              <Title
                className={title ? title[0].slice(-3) : ""}
                text={title ? title[0].slice(0, -4) : ""}
              />
              <Title
                className={title ? title[1].slice(-3) : ""}
                text={title ? title[1].slice(0, -4) : ""}
              />
              <Title
                className={title ? title[2].slice(-3) : ""}
                text={title ? title[2].slice(0, -4) : ""}
              />
            </div>
            <div className="header-content-middle">
              <div className="shifts">
                <CheckboxShift
                  id="shiftOne"
                  lClassName={shiftOne ? shiftOne[0].slice(-3) : ""}
                  name={"shiftOne"}
                  checked={shiftBools.shiftOne}
                  onCheck={this.onCheck.bind(this)}
                  inputText={shiftOne ? shiftOne[0].slice(0, -4) : ""}
                  pClassName={shiftOne ? shiftOne[1].slice(-3) : ""}
                  pText={shiftOne ? shiftOne[1].slice(0, -4) : ""}
                />
                <CheckboxShift
                  id="shiftTwo"
                  lClassName={shiftTwo ? shiftTwo[0].slice(-3) : ""}
                  name={"shiftTwo"}
                  checked={shiftBools.shiftTwo}
                  onCheck={this.onCheck.bind(this)}
                  inputText={shiftTwo ? shiftTwo[0].slice(0, -4) : ""}
                  pClassName={shiftTwo ? shiftTwo[1].slice(-3) : ""}
                  pText={shiftTwo ? shiftTwo[1].slice(0, -4) : ""}
                />
                <CheckboxShift
                  id="shiftThree"
                  lClassName={shiftThree ? shiftThree[0].slice(-3) : ""}
                  name={"shiftThree"}
                  checked={shiftBools.shiftThree}
                  onCheck={this.onCheck.bind(this)}
                  inputText={shiftThree ? shiftThree[0].slice(0, -4) : ""}
                  pClassName={shiftThree ? shiftThree[1].slice(-3) : ""}
                  pText={shiftThree ? shiftThree[1].slice(0, -4) : ""}
                />
              </div>
            </div>
            <div className="header-content-buttons">
              <div className="header-content-buttons-row">
                <Button
                  variant="outline-primary"
                  onClick={() => this.showSelected()}
                  className=""
                >
                  Show Selected
                </Button>
              </div>
              <div className="header-content-buttons-row">
                <Button
                  variant="outline-primary"
                  onClick={() => this.hideSelected()}
                  className=""
                >
                  Hide Selected
                </Button>
              </div>
            </div>
            <div className="header-content-buttons-reset">
              <div className="header-content-buttons-row">
                <Button
                  variant="outline-danger"
                  onClick={() => this.reset()}
                  className=""
                >
                  Reset
                </Button>
              </div>
            </div>
            <div className="header-content-buttons-two">
              <div className="header-content-buttons-row">
                <Button
                  variant={this.state.sizing ? "success" : "outline-success"}
                  onClick={() => this.sizing()}
                >
                  {this.state.sizing ? "Auto Sizing On" : "Auto Sizing Off"}
                </Button>
              </div>
              <div className="header-content-buttons-row">
                <Button
                  variant={this.state.refresh ? "success" : "outline-success"}
                  onClick={() => this.refresh()}
                >
                  {this.state.refresh ? "Auto Refresh On" : "Auto Refresh Off"}
                </Button>
              </div>
            </div>
            <div className="header-content-buttons-three">
              <div className="header-content-buttons-row">
                <NavLink to={"/home"}>
                  <Button variant="outline-secondary" className="home">
                    Home
                  </Button>
                </NavLink>
              </div>
            </div>
            <div className="header-content-right">
              <div className="header-content-right-row-1">
                <Button
                  variant="outline-success"
                  onClick={() => this.handlePrint()}
                  className={"print-span"}
                >
                  {"Print"}
                </Button>
                <Time
                  className={currentTime ? currentTime.split(";")[1] : ""}
                  time={currentTime ? currentTime.split(";")[0] : ""}
                />
              </div>
              <br />
              <div className="header-content-right-row-2">
                <FlightException
                  style={{ margin: "0 10px 0 0" }}
                  className={maints ? maints.split(";")[1] : ""}
                  exception={maints ? maints.split(";")[0] : ""}
                />
                <FlightException
                  style={{ margin: "0 10px 0 0" }}
                  className={spares ? spares.split(";")[1] : ""}
                  exception={spares ? spares.split(";")[0] : ""}
                />
                <FlightException
                  className={opens ? opens.split(";")[1] : ""}
                  exception={opens ? opens.split(";")[0] : ""}
                />
              </div>
            </div>
          </div>
          {misc ? <Misc className="misc" misc={misc} /> : ""}
        </div>

        <div className="App-content">
          <FlightTableB
            sorted={this.state.isSorted}
            secondarySorted={this.state.isSecondarySorted}
            selected={this.state.selectedColumn}
            handleRightClickTh={this.handleRightClickTh.bind(this)}
            handleOnMouseDownTh={this.handleOnMouseDownTh.bind(this)}
            handleClick={this.handleClick.bind(this)}
            // handleRightClick={this.handleRightClick.bind(this)}
            onSort={this.onSort.bind(this)}
            content={content}
            columns={columns}
          />
        </div>
      </div>
    );
  }
}

export default App;
