import React, { Component } from "react";
import TableRow from "./TableRow";
import Table from "react-bootstrap/Table";
import styled from "styled-components";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Th = styled.th`
  border: ${props => (props.isSelected ? "2px solid blue" : "")} !important;
  color: ${props => (props.isSorted ? "blue" : "")} !important;
  background-color: ${props =>
    props.isSecondarySorted ? "lightblue" : ""} !important;
`;

class FlightTableB extends Component {
  constructor(props) {
    super(props);
    this.sortHandler = this.sortHandler.bind(this);
    this.onMouseDownHandler = this.onMouseDownHandler.bind(this);
    // this.onContextMenuHandler = this.onContextMenuHandler.bind(this);
    this.onContextMenuHandlerTh = this.onContextMenuHandlerTh.bind(this);
    this.onMouseDownHandlerTh = this.onMouseDownHandlerTh.bind(this);
  }

  sortHandler(item, content) {
    this.props.onSort(item, content);
  }

  // onContextMenuHandler(e) {
  //   this.props.handleRightClick(e);
  // }

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
    return (
      <Table hover bordered striped size="sm" id="override">
        <thead>
          <tr>
            {Object.keys(this.props.content[0] || {})
              .filter(i => i !== "undefined")
              .map((item, i) => (
                <Th
                  isSelected={this.props.selected === item}
                  isSorted={this.props.sorted === item}
                  isSecondarySorted={this.props.secondarySorted === item}
                  key={i}
                  className={
                    item.includes(";") ? item.split(";")[1].trim() : ""
                  }
                  onClick={() => this.sortHandler(item, this.props.content)}
                  onContextMenu={e => this.onContextMenuHandlerTh(e, item)}
                  onMouseDown={e => this.onMouseDownHandlerTh(e, item)}
                >
                  {item.includes(";") ? item.split(";")[0].trim() : ""}
                </Th>
              ))}
          </tr>
        </thead>
        <tbody>
          {this.props.content
            ? this.props.content.map((i, ii) => (
                <TableRow
                  key={"tr" + ii}
                  id={ii}
                  children={Object.keys(i)
                    .filter(i => i !== "undefined")
                    .map((j, jj) => (
                      <td
                        style={{
                          textAlign: j.startsWith("AC TYPE")
                            ? "left"
                            : j.startsWith("PAYLOAD")
                            ? "right"
                            : ""
                        }}
                        id={`${ii}/${jj}`}
                        // onContextMenu={this.onContextMenuHandler}
                        onMouseDown={e => this.onMouseDownHandler(e, i)}
                        key={jj}
                        className={
                          i[j]
                            ? i[j].split(";")[i[j].split(";").length - 1]
                            : ""
                        }
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
