import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import CheckboxShift from "./Components/Checkbox";
import {
  Title,
  PrintButton,
  Time,
  FlightException,
  Misc
} from "./Components/Stateless";
import FlightTable from "./Components/FlightTable";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      fileLinesContent: [],
      flightStatus: [],
      shiftBools: {}
    };
  }

  componentDidMount() {
    let location = this.props.location.pathname;
    if (location === "/upload") {
      const data = this.props.location.state
        ? this.props.location.state["file"]
        : "";

      if (data) {
        this.setState({
          flightType: data ? data[1].split(",")[0] : "",
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
          misc: data[3]
            .split(",")
            .filter(
              i => i.trim() !== "" && i !== "^^^^^" && i.trim() !== "vvvvv"
            ),
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
          currentTime: data[0].split(",")[6]
        });

        this.setState({
          initial: { ...this.state }
        });
      }
    } else {
      let formatLocation = location.slice(1);
      fetch(
        `http://wtc-275124-w23.corp.ds.fedex.com:9090/file/serve?file=${formatLocation}.csv`
      ).then(response =>
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
            misc: data[3]
              .split(",")
              .filter(
                i => i.trim() !== "" && i !== "^^^^^" && i.trim() !== "vvvvv"
              ),
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
            currentTime: data[0].split(",")[6]
          });
          this.setState({
            initial: { ...this.state }
          });
        })
      );
    }
  }

  reset() {
    let x = document.getElementsByTagName("tr");
    for (let i = 0; i < x.length; i++) {
      if (
        x.item(i).classList.contains("hidden") ||
        x.item(i).classList.contains("selectedRow")
      ) {
        x.item(i).classList.remove("hidden");
        x.item(i).classList.remove("selectedRow");
      }
    }
  }

  showSelected() {
    let x = document.getElementsByTagName("tr");
    let y = document.getElementsByClassName("selectedRow");

    if (y.length > 0) {
      for (var i = 1; i < x.length; i++) {
        if (!x.item(i).classList.contains("selectedRow")) {
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
      if (x.item(i).classList.contains("selectedRow")) {
        x.item(i).classList.add("hidden");
      }
    }
  }

  handleColumnExceptionSort(column) {
    console.log("AC, Gate, STA or STD sort...");
    let direction = this.state.direction;
    let sortedData = this.state.fileLinesContent.sort((a, b) => {
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
      return 0;
    });

    if (!direction) {
      sortedData.reverse();
    }

    this.setState({
      fileLinesContent: sortedData,
      direction: !this.state.direction
    });
  }

  handleFlightSort() {
    console.log("Flight Sort...");
    let direction = this.state.direction;
    let sortedData = this.state.fileLinesContent.sort((a, b) => {
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
      return 0;
    });

    if (!direction) {
      sortedData.reverse();
    }

    this.setState({
      fileLinesContent: sortedData,
      direction: !this.state.direction
    });
  }

  onSort(column) {
    if (column === "FLIGHT;BBW") {
      let columnOne = document.getElementById("FLIGHT");
      let columnTwo = document.getElementById("GATE");
      let elements = document.getElementsByTagName("th");
      for (let i = 0; i < elements.length; i++) {
        elements.item(i).style.backgroundColor = "";
      }
      columnOne.style.backgroundColor = "blue";
      columnTwo.style.backgroundColor = "lightblue";

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
        elements.item(i).style.backgroundColor = "";
      }
      columnOne.style.backgroundColor = "blue";
      columnTwo.style.backgroundColor = "lightblue";

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
        elements.item(i).style.backgroundColor = "";
      }
      columnOne.style.backgroundColor = "blue";
      columnTwo.style.backgroundColor = "lightblue";

      let direction = this.state.direction;

      let sortedData = this.state.fileLinesContent.sort((a, b) => {
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
          } else {
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
            } else {
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
          return 0;
        });
      }

      this.setState({
        fileLinesContent: sortedData,
        direction: !this.state.direction
      });
    }
  }

  onCheck(name) {
    this.setState({
      shiftBools: {
        ...this.state.shiftBools,
        [name]: !this.state.shiftBools[name]
      }
    });
  }

  handleRightClick(e) {
    if (e.button === 2) {
      e.preventDefault();
      let x = e.target.id;
      let y = document.getElementById(x.split("/")[0]);
      if (y.classList) {
        if (y.classList.contains("selectedRow")) {
          y.classList.remove("selectedRow");
        } else {
          y.classList.add("selectedRow");
        }
      } else {
        y.classList.add("selectedRow");
      }
    }
  }
  handleClick(e) {
    e.preventDefault();
    if (e.button === 0) {
      console.log("Hello There");
    }
    if (e.button === 1) {
      let a = e.target.id;
      let b = document.getElementById(a.split("/")[0]);
      if (b.classList) {
        b.classList.add("hidden");
      } else {
        b.className += " hidden";
      }
    }
  }

  render() {
    const content = this.state.fileLinesContent
      ? this.state.fileLinesContent.reduce((acc, c, i) => {
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
        }, [])
      : "";
    const columns = this.state.columnTitles ? this.state.columnTitles : [];
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
                <div onClick={() => this.hideSelected()} className="">
                  <span>
                    <p>Hide Selected</p>
                  </span>
                </div>
              </div>
              <br />
              <div className="header-content-buttons-row">
                <NavLink to={"/home"}>
                  <div className="">
                    <span>
                      <p>Home</p>
                    </span>
                  </div>
                </NavLink>
                <div onClick={() => this.reset()} className="">
                  <span>
                    <p>Reset</p>
                  </span>
                </div>
              </div>
            </div>

            <div className="header-content-right">
              <div className="header-content-right-row-1">
                <PrintButton className="print-span" text="Print" />
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
          {/* <div className="content"> */}
          <FlightTable
            handleClick={this.handleClick.bind(this)}
            handleRightClick={this.handleRightClick.bind(this)}
            onSort={this.onSort.bind(this)}
            content={content}
            columns={columns}
          />
        </div>
        {/* </div> */}
      </div>
    );
  }
}

export default App;
