import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import styled from "styled-components";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Th = styled.th`
  border: ${props => (props.isSelected ? "2px solid blue" : "")} !important;
  color: ${props => (props.isSorted ? "blue" : "")} !important;
  background-color: ${props =>
    props.isSecondarySorted ? "lightblue" : ""} !important;
`;

const Tr = styled.tr`
  border-bottom: ${props =>
    props.isSelectedRow ? "1px solid black" : "none"} !important;
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
                    item.includes(";") ? item.split(";")[1].trim() : "",
                    item.startsWith("I/R")
                      ? "IR"
                      : item.startsWith("EMP#")
                      ? "EMP"
                      : item.startsWith("OFF/SEQ")
                      ? "OFFSEQ"
                      : item.split(";")[0],
                    "EE"
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
                    .map((j, jj) => (
                      <td
                        title={i[j] ? i[j].split(";")[0] : ""}
                        onContextMenu={e => this.onContextMenuHandler(e, i)}
                        onMouseDown={e => this.onMouseDownHandler(e, i)}
                        key={jj}
                        className={[
                          i[j]
                            ? i[j].split(";")[i[j].split(";").length - 1] + " "
                            : "",
                          j.startsWith("I/R")
                            ? "IR"
                            : j.startsWith("EMP#")
                            ? "EMP"
                            : j.startsWith("OFF/SEQ")
                            ? "OFFSEQ"
                            : j.split(";")[0],
                          "EE"
                        ].join(" ")}
                      >
                        {i[j]
                          ? i[j].split(";")[i[j].split(";").length - 2]
                          : ""}
                      </td>
                    ))}
                />
              ))
            : []}
        </tbody>
      </Table>
    );
  }
}

export default FlightTableB;
