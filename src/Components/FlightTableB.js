import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import styled from "styled-components";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Th = styled.th`
  border: ${props => (props.isSelected ? "2px solid blue" : "")} !important;
  background-color: ${props => (props.isSorted ? "lightblue" : "")} !important;
  color: ${props => (props.isSecondarySorted ? "blue" : "")} !important;
`;

// border-bottom: ${props => props.isSelectedRow ? "1px solid black" : "none"} !important;
const Td = styled.td`
  display: flex;
`;

const Tr = styled.tr`
   ${Td} {
     border-bottom: ${props =>
       props.isSelectedRow ? "1px solid black" : ""} !important;}
   }
`;

const TipDiv = styled.div`
  white-space: nowrap;
  display: flex;
  align-content: center;
  justify-content: center;
  z-index: 50000;
  margin-left: ${props => (props.jj >= 18 ? "-4em" : "-1em")};
  visibility: ${props =>
    props.i["row"] + ":" + props.jj === props.selectedTd
      ? "visible"
      : "hidden"};

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    margin-left: ${props => (props.jj >= 18 ? "-1em" : "-1em")};
  };

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    margin-left: ${props => (props.jj >= 18 ? "-6em" : "-1em")};
  }
  
`;

class FlightTableB extends Component {
  constructor(props) {
    super(props);
    this.sortHandler = this.sortHandler.bind(this);
    this.onMouseDownHandler = this.onMouseDownHandler.bind(this);
    this.onContextMenuHandler = this.onContextMenuHandler.bind(this);
    this.onContextMenuHandlerTh = this.onContextMenuHandlerTh.bind(this);
    this.onMouseDownHandlerTh = this.onMouseDownHandlerTh.bind(this);
  }

  columnException(name) {
    return (
      name.startsWith("I/R") ||
      name.startsWith("IN") ||
      name.startsWith("ON") ||
      name.startsWith("STD") ||
      name.startsWith("STA")
    );
  }
  sortHandler(item, content, clicked) {
    this.props.onSort(item, content, clicked);
  }

  onContextMenuHandler(e, i) {
    this.props.handleRightClickRow(e, i);
  }

  onMouseDownHandler(e, i) {
    this.props.handleClick(e, i);
  }

  onContextMenuHandlerTh(e, item) {
    this.props.handleRightClickTh(e, item);
  }

  onMouseDownHandlerTh(e, item) {
    this.props.handleOnMouseDownTh(e, item);
  }

  onClickHandlerTd(rowObject, objectKeyIndex) {
    console.log(rowObject);
    console.log(objectKeyIndex);
    this.props.handleOnClickTd(rowObject, objectKeyIndex);
  }

  render() {
    const selectedRowsPK = this.props.selectedRows.map(
      i => i["FLIGHT;BBW"] + i["GATE;BBW"]
    );
    return (
      <Table hover bordered striped size="sm" id="override">
        <thead>
          <tr>
            {Object.keys(this.props.content[0] || {})
              .filter(i => i !== "undefined" && i !== "row")
              .map((item, i) => (
                <Th
                  isSelected={this.props.selected === item}
                  isSorted={this.props.sorted === item}
                  isSecondarySorted={this.props.secondarySorted === item}
                  key={i}
                  className={[
                    item.includes(";") ? item.split(";")[1].trim() : ""
                    // item.startsWith("I/R")
                    //   ? "IR"
                    //   : item.startsWith("EMP#")
                    //   ? "EMP"
                    //   : item.startsWith("OFF/SEQ")
                    //   ? "OFFSEQ"
                    //   : item.split(";")[0],
                    // "EE"
                  ].join(" ")}
                  onClick={() =>
                    this.sortHandler(item, this.props.content, true)
                  }
                  onContextMenu={e => this.onContextMenuHandlerTh(e, item)}
                  onMouseDown={e => this.onMouseDownHandlerTh(e, item)}
                  title={
                    this.props.selected
                      ? "Left/Right Arrow Keys"
                      : "Left/Middle/Right Click"
                  }
                >
                  {item.includes(";") ? item.split(";")[0].trim() : ""}
                </Th>
              ))}
          </tr>
        </thead>

        <tbody className="tbody-class">
          {this.props.content
            ? this.props.content.map((i, ii) => (
                <Tr
                  isSelectedRow={selectedRowsPK.includes(
                    i["FLIGHT;BBW"] + i["GATE;BBW"]
                  )}
                  className={ii % 2 === 1 ? "striped" : ""}
                  key={"tr" + ii}
                  id={ii}
                  children={Object.keys(i)
                    .filter(i => i !== "undefined" && i !== "row")
                    .map((j, jj) => {
                      return (
                        <Td
                          isSelectedTd={this.props.isSelectedTd}
                          style={{
                            position: "relative",
                            zIndex: "auto",
                            border:
                              this.props.currentTime ===
                              i[j]
                                .split(";")
                                [i[j].split(";").length - 1].split("@")[
                                i[j]
                                  .split(";")
                                  [i[j].split(";").length - 1].split("@")
                                  .length - 1
                              ]
                                ? "2.5px solid red"
                                : ""
                          }}
                          // title={
                          //   i[j].split(";").length > 2 &&
                          //   i[j].split(";")[i[j].split(";").length - 1].length !==
                          //     3
                          //     ? i[j]
                          //         .split(";")
                          //         [i[j].split(";").length - 1].split(" ")
                          //         .reduce((acc, c) => (acc += c + '\n'), '')
                          //     : ""
                          // }
                          onContextMenu={e => this.onContextMenuHandler(e, i)}
                          onMouseDown={e => this.onMouseDownHandler(e, i)}
                          key={jj}
                          onClick={() =>
                            // console.log('clicked')
                            // console.log(`before: ${tipVisibility}`)
                            // tipVisibility = !tipVisibility
                            // console.log(`after: ${tipVisibility}`)
                            this.onClickHandlerTd(i, jj)
                          }
                          className={[
                            "tooltip",
                            i[j].split(";").filter(k => k.length === 3)
                            // i[j]
                            //   ? i[j].split(";")[i[j].split(";").length - 1] + " "
                            //   : "",
                            // j.startsWith("I/R")
                            //   ? "IR"
                            //   : j.startsWith("EMP#")
                            //   ? "EMP"
                            //   : j.startsWith("OFF/SEQ")
                            //   ? "OFFSEQ"
                            //   : j.split(";")[0],
                            // "EE"
                          ].join(" ")}
                        >
                          {/* {i[j]
                          ? i[j].split(";")[i[j].split(";").length - 2]
                          : ""} */}
                          {/* {i
                          ? this.columnException(j)
                            ? i[j].split(";")[1]
                            : i[j].split(";")[0]
                          : ""} */}
                          {/* <span className="tooltiptext">{i[j].split(";").length > 2
                            ? i[j].split(";")[i[j].split(";").length - 1].split(" ").reduce((acc, c) => acc += c + "\n" ,"")
                            : ""}</span> */}
                          {
                            // i[j].split(";").length > 2 &&
                            // i[j].split(";")[i[j].split(";").length - 1]
                            //   .length !== 3
                            //   ? i[j]
                            //       .split(";")
                            //       [i[j].split(";").length - 1].split(" ").map(k => <span className="tooltiptext">{k}<br/></span> ) : ""
                            // <span className="tooltiptext">
                            //   {i[j].split(";").length > 2 &&
                            //   i[j].split(";")[i[j].split(";").length - 1]
                            //     .length !== 3
                            //     ? i[j]
                            //         .split(";")
                            //         [i[j].split(";").length - 1].split(" ")
                            //         .reduce((acc, c) => `${acc += c} \n` , ``)
                            //     : ""}
                            // </span>
                          }
                          {i ? i[j].split(";")[0] : ""}
                          <TipDiv
                            i={i}
                            jj={jj}
                            selectedTd={this.props.selectedTd}
                            className="tooltiptext"
                            key={j}
                          >
                            <div style={{ zIndex: "inherit" }}>
                              {i[j].split(";").length > 2
                                ? i[j]
                                    .split(";")
                                    [i[j].split(";").length - 1].split(" ")
                                    .map((result, x) => (
                                      <span
                                        style={{ zIndex: "inherit" }}
                                        key={x}
                                      >
                                        {result}
                                        <br />
                                      </span>
                                    ))
                                : ""}
                            </div>
                          </TipDiv>
                        </Td>
                      );
                    })}
                />
              ))
            : []}
        </tbody>
      </Table>
    );
  }
}

export default FlightTableB;
