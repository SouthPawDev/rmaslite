import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export function HomeButton() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
        Stations
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/MEM_SVR_OBLIST">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
