import React, { Component } from "react";
import styled from "styled-components";

const Tr = styled.tr``;

class TableRow extends Component {
  handleRightClick(e) {
    e.preventDefault();
    let y = e.currentTarget;
    if (y.classList) {
      if (y.classList.contains("selected")) {
        y.classList.remove("selected");
      } else {
        y.classList.add("selected");
      }
    } else {
      y.classList.add("selected");
    }
  }

  render() {
    return (
      <Tr onContextMenu={this.handleRightClick.bind(this)} id={this.props.id}>
        {this.props.children}
      </Tr>
    );
  }
}

export default TableRow;
