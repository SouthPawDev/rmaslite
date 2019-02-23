import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import CheckboxShift from "./Components/Checkbox";
import { Title, Time, FlightException, Misc } from "./Components/Stateless";
import FlightTable from "./Components/FlightTable";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      direction: true,
      data: [],
      // fileLinesContent: [],
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

    console.log(y);

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
    console.log(column);

    if (column === "FLIGHT;BBW") {
      let columnOne = document.getElementById("FLIGHT");
      let columnTwo = document.getElementById("GATE");
      let elements = document.getElementsByTagName("th");
      for (let i = 0; i < elements.length; i++) {
        elements.item(i).style.color = "black";
        elements.item(i).style.backgroundColor = "white";
      }
      if (columnOne !== null) {
        columnOne.style.color = "blue";
      }
      if (columnTwo !== null) {
        columnTwo.style.backgroundColor = "lightblue";
      }

      this.handleFlightSort();
    } else if (
      column === "AC;BBW" ||
      column === "GATE;BBW" ||
      column === "STA;BBW" ||
      column === "STD;BBW"
    ) {
      let columnOne = document.getElementById(column.split(";")[0]);
      let columnTwo = document.getElementById("FLIGHT");
      let elements = document.getElementsByTagName("th");
      for (let i = 0; i < elements.length; i++) {
        elements.item(i).style.color = "black";
        elements.item(i).style.backgroundColor = "white";
      }
      if (columnOne !== null) {
        columnOne.style.color = "blue";
      }
      if (columnTwo !== null) {
        columnTwo.style.backgroundColor = "lightblue";
      }

      this.handleColumnExceptionSort(column);
    } else {
      let type = this.state.rmas[1].split(";")[0];
      let columnOne = document.getElementById(column.split(";")[0]);
      let columnTwo =
        type === "INBOUND"
          ? document.getElementById("STA")
          : document.getElementById("STD");
      let elements = document.getElementsByTagName("th");
      for (let i = 0; i < elements.length; i++) {
        elements.item(i).style.color = "black";
        elements.item(i).style.backgroundColor = "white";
      }
      if (columnOne !== null) {
        columnOne.style.color = "blue";
      }
      if (columnTwo !== null) {
        columnTwo.style.backgroundColor = "lightblue";
      }

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

  // handleRightClick(e) {
  //   if (e.button === 2) {
  //     e.preventDefault();
  //     let x = e.target.id;
  //     let y = document.getElementById(x.split("/")[0]);

  // }
  handleRightClickTh(e, column) {
    e.preventDefault();
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

  handleClick(e) {
    e.preventDefault();
    if (e.button === 0) {
      console.log("Hello There");
    }
    if (e.button === 1) {
      let x = e.target.parentElement.id;
      console.log(x);

      this.setState({
        currentFileLinesContent: this.state.currentFileLinesContent.filter(
          (i, j) => j !== parseInt(x)
        )
      });

      // this.setState({
      //   currentFileLinesContent: this.state.currentFileLinesContent.filter(
      //     (i, j) => j !== x
      //   )
      // });
      // let a = e.target.id;
      // let b = document.getElementById(a.split("/")[0]);
      // if (b.classList) {
      //   b.classList.add("hidden");
      // } else {
      //   b.className += " hidden";
      // }
    }
  }

  handlePrint() {
    document.getElementsByTagName("table")[0].style.height = "100%";
    document.getElementsByTagName("tbody")[0].style.overflowY = "auto";
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
      <div className="App">
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
                  lClassName={shiftOne ? shiftOne[0].slice(-3) : ""}
                  name={"shiftOne"}
                  checked={shiftBools.shiftOne}
                  onCheck={this.onCheck.bind(this)}
                  inputText={shiftOne ? shiftOne[0].slice(0, -4) : ""}
                  pClassName={shiftOne ? shiftOne[1].slice(-3) : ""}
                  pText={shiftOne ? shiftOne[1].slice(0, -4) : ""}
                />
                <CheckboxShift
                  lClassName={shiftTwo ? shiftTwo[0].slice(-3) : ""}
                  name={"shiftTwo"}
                  checked={shiftBools.shiftTwo}
                  onCheck={this.onCheck.bind(this)}
                  inputText={shiftTwo ? shiftTwo[0].slice(0, -4) : ""}
                  pClassName={shiftTwo ? shiftTwo[1].slice(-3) : ""}
                  pText={shiftTwo ? shiftTwo[1].slice(0, -4) : ""}
                />
                <CheckboxShift
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
                <div onClick={() => this.showSelected()} className="">
                  <span>
                    <p>Show Selected</p>
                  </span>
                </div>
              </div>
              <div className="header-content-buttons-row">
                <div onClick={() => this.hideSelected()} className="">
                  <span>
                    <p>Hide Selected</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="header-content-buttons-reset">
              <div className="header-content-buttons-row">
                <div onClick={() => this.reset()} className="">
                  <span>
                    <p>Reset</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="header-content-buttons-two">
              <div className="header-content-buttons-row">
                <div
                  style={{
                    border: this.state.sizing ? "1px solid black" : "",
                    backgroundColor: this.state.sizing ? "springgreen" : ""
                  }}
                  onClick={() => this.sizing()}
                >
                  <span>
                    <p>
                      {this.state.sizing ? "Auto Sizing On" : "Auto Sizing Off"}
                    </p>
                  </span>
                </div>
              </div>
              <div className="header-content-buttons-row">
                <div
                  style={{
                    border: this.state.refresh ? "1px solid black" : "",
                    backgroundColor: this.state.refresh ? "springgreen" : ""
                  }}
                  onClick={() => this.refresh()}
                >
                  <span>
                    <p>
                      {this.state.refresh
                        ? "Auto Refresh On"
                        : "Auto Refresh Off"}
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <div className="header-content-buttons-three">
              <div className="header-content-buttons-row">
                <div className="home">
                  <NavLink to={"/home"}>
                    <span>
                      <p>Home</p>
                    </span>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="header-content-right">
              <div className="header-content-right-row-1">
                <span
                  onClick={() => this.handlePrint()}
                  className={"print-span"}
                >
                  <p>{"Print"}</p>
                </span>
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
          <FlightTable
            handleRightClickTh={this.handleRightClickTh.bind(this)}
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
