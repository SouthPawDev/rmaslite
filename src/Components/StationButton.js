import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function StationButton() {
  return (
    <Dropdown
      alignRight>
      <Dropdown.Toggle

        size="sm"
        variant="outline-secondary"
        id="dropdown-basic"
      >
        Stations
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <div style={{ display: 'flex' }}>
          <div style={{borderRight: '1px solid white'}}>
            <Dropdown.Item href="#/MEM_SVR_IBLIST">MEM Inbound</Dropdown.Item>
            <Dropdown.Item href="#/MEM_SVR_OBLIST">MEM Outbound</Dropdown.Item>
            <Dropdown.Item href="#/MEM_SVR_SDLIST/INLET">
              MEM SD Inlet
            </Dropdown.Item>
            <Dropdown.Item style={{borderBottom: '1px solid white'}} href="#/MEM_SVR_SDLIST/DEICE">
              MEM SD Deice
            </Dropdown.Item>
 
            <Dropdown.Item href="#/IND_SVR_IBLIST">IND Inbound</Dropdown.Item>
            <Dropdown.Item href="#/IND_SVR_OBLIST">IND Outbound</Dropdown.Item>
            <Dropdown.Item href="#/IND_SVR_SDLIST/INLET">
              IND SD Inlet
            </Dropdown.Item>
            <Dropdown.Item href="#/IND_SVR_SDLIST/DEICE">
              IND SD Deice
            </Dropdown.Item>
          </div>
          <div style={{borderRight: '1px solid white'}}>
            <Dropdown.Item href="#/CDG_SVR_IBLIST">CDG Inbound</Dropdown.Item>
            <Dropdown.Item href="#/CDG_SVR_OBLIST">CDG Outbound</Dropdown.Item>
            <Dropdown.Item href="#/CDG_SVR_SDLIST/INLET">
              CDG SD Inlet
            </Dropdown.Item>
            <Dropdown.Item style={{borderBottom: '1px solid white'}} href="#/CDG_SVR_SDLIST/DEICE">
              CDG SD Deice
            </Dropdown.Item>
            <Dropdown.Item href="#/CAN_SVR_IBLIST">CAN Inbound</Dropdown.Item>
            <Dropdown.Item href="#/CAN_SVR_OBLIST">CAN Outbound</Dropdown.Item>
            <Dropdown.Item href="#/CAN_SVR_SDLIST/INLET">
              CAN SD Inlet
            </Dropdown.Item>
            <Dropdown.Item href="#/CAN_SVR_SDLIST/DEICE">
              CAN SD Deice
            </Dropdown.Item>
          </div>
          <div style={{borderRight: '1px solid white'}}>
            <Dropdown.Item href="#/EWR_SVR_IBLIST">EWR Inbound</Dropdown.Item>
            <Dropdown.Item href="#/EWR_SVR_OBLIST">EWR Outbound</Dropdown.Item>
            <Dropdown.Item href="#/EWR_SVR_SDLIST/INLET">
              EWR SD Inlet
            </Dropdown.Item>
            <Dropdown.Item style={{borderBottom: '1px solid white'}} href="#/EWR_SVR_SDLIST/DEICE">
              EWR SD Deice
            </Dropdown.Item>
            <Dropdown.Item href="#/AFW_SVR_IBLIST">AFW Inbound</Dropdown.Item>
            <Dropdown.Item href="#/AFW_SVR_OBLIST">AFW Outbound</Dropdown.Item>
            <Dropdown.Item href="#/AFW_SVR_SDLIST/INLET">
              AFW SD Inlet
            </Dropdown.Item>
            <Dropdown.Item href="#/AFW_SVR_SDLIST/DEICE">
              AFW SD Deice
            </Dropdown.Item>
          </div>
          <div>
            <Dropdown.Item href="#/OAK_SVR_IBLIST">OAK Inbound</Dropdown.Item>
            <Dropdown.Item href="#/OAK_SVR_OBLIST">OAK Outbound</Dropdown.Item>
            <Dropdown.Item href="#/OAK_SVR_SDLIST/INLET">
              OAK SD Inlet
            </Dropdown.Item>
            <Dropdown.Item style={{borderBottom: '1px solid white'}} href="#/OAK_SVR_SDLIST/DEICE">
              OAK SD Deice
            </Dropdown.Item>
            <Dropdown.Item href="#/GSO_SVR_IBLIST">GSO Inbound</Dropdown.Item>
            <Dropdown.Item href="#/GSO_SVR_OBLIST">GSO Outbound</Dropdown.Item>
            <Dropdown.Item href="#/GSO_SVR_SDLIST/INLET">
              GSO SD Inlet
            </Dropdown.Item>
            <Dropdown.Item href="#/GSO_SVR_SDLIST/DEICE">
              GSO SD Deice
            </Dropdown.Item>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}
