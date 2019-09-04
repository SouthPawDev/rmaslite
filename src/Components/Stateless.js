import React from "react";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

export default function Hello(props) {
  return <h1>Hello World!</h1>;
}

export function Title(props) {
  return <p className={props.className}>{props.text}</p>;
}

export function Time(props) {
  return <p className={props.className}>{props.time}</p>;
}

export function FlightException(props) {
  const handler = props => {
    props.onCheckException(props.exception);
  };
  return (
    <React.Fragment>
      <input
        type="checkbox"
        onChange={() => handler(props)}
        checked={props.checked}
        disabled={props.isDisabled}
      />
      <p style={props.style} className={props.className}>
        {props.exception}
      </p>
    </React.Fragment>
  );
}

const StyledMisc = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MiscArrayDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100&;
`;

const TooltipWrapper = styled.div`
  display: ${props => (props.isHidden ? "none" : "flex")};
  flex-direction: column;
  align-items: start;
  margin: 10px;
`;

const Help = styled(Button)``;

export function Misc(props) {
  const displayHelpHelpHandler = () => {
    props.displayHelp();
  };
  const exportContentHandler = () => {
    props.exportContent();
  };
  return (
    <div id="misc">
      <TooltipWrapper isHidden={props.help}>
        <h5>
          <u>
            <strong>Column Headers</strong>
          </u>
          : <strong>Left Click:</strong> Sort, <strong>Middle Click:</strong>{' '}
          Delete, <strong>Right Click:</strong> Select
 </h5>
        <h5>
          <u>
            <strong>Sorted Column Colors</strong>
          </u>
          : Primary Sort Column = Lite Blue Background; Secondary Sort Column =
          Bold Blue Font
 </h5>
        <h5>
          <u>
            <strong>Selected Column</strong>
          </u>:{' '}
          Left/Right Arrows Keys Rearrange
 </h5>
        <h5>
          <u>
            <strong>Rows</strong>
          </u>
          : <strong>Middle Click:</strong> Delete, <strong>Right Click:</strong>{' '}
          Underline/Select
 </h5>
        <h5>
          <u>
            <strong>Cell History Display</strong>
          </u>:{' '}
          <strong>Left Click:</strong> Displays up to the last 10 cell value history changes/time.
 </h5>
        <h5>
          <u>
            <strong>Cell Contents Update Notification</strong>
          </u>
          : A red border box will be placed around the cell if recently updated/refreshed.
 </h5>
        <h5>
          <u>
            <strong>Show Selected Toggle Button</strong>
          </u>
          : Show Only Selected Rows (Underlined Rows)
 </h5>
        <h5>
          <u>
            <strong>Hide Selected Toggle Button</strong>
          </u>
          : Hide Selected Rows (Underlined Rows)
 </h5>
        <h5>
          <strong>
            <u>Reset Columns Button</u>:{' '}
          </strong>
          Reset All Deleted and Rearranged Columns to Original Load
 </h5>
        <h5>
          <strong>
            <u>Reset Flights Button</u>:{' '}
          </strong>
          Reset All Selected, Hidden, Deleted Flights (Rows) to Original Load
 </h5>
        <h5>
          <strong>
            <u>Auto Sizing Toggle Button</u>:{' '}
          </strong>
          Makes the Website Resizable for Dynamic Screen Sizes
 </h5>
        <h5>
          <strong>
            <u>Auto Refresh Toggle Button</u>:{' '}
          </strong>
          Check every minute for List Updates
 </h5>
        <h5>
          <strong>
            <u>Home Button</u>:{' '}
          </strong>
          Redirects to the RMAS Lite Site Selection Page
 </h5>
        <h5>
          <strong>
            <u>Other Lists Drop Down</u>:{' '}
          </strong>
          Allows for quick selection of other RMAS Lite lists
 </h5>
        <h5>
          <strong>
            <u>Print Button</u>:{' '}
          </strong>
          Prints the Entire Table Except for Hidden/Deleted Rows and Columns
 </h5>
        <h5>
          <strong>
            <u>Export Button</u>:{' '}
          </strong>
          Exports the Currently Displayed Table to a CSV File
 </h5>
        <h5>
          <strong>
            <u>Flight/Maint/Spare/Open Checkbox</u>:{' '}
          </strong>
          Shows Displayed Table Count or Unchecked Shows Total Available
 </h5>
      </TooltipWrapper>
      <StyledMisc>
        <MiscArrayDiv>
          {props.misc
            .filter(i => i.trim() !== "" && i !== "^^^^^")
            .map((i, ii) => (
              <p
                style={{ padding: "0 2px 0 2px", margin: 0 }}
                key={"misc" + ii}
                className={i.split(";")[i.split(";").length - 1]}
              >
                {i.split(";")[i.split(";").length - 2]}
              </p>
            ))}
        </MiscArrayDiv>
        <div>
          <Help
            onClick={() => displayHelpHelpHandler()}
            variant="outline-warning"
            size="sm"
          >
            {props.help ? "Help" : "Hide"}
          </Help>
          <Button
            onClick={() => exportContentHandler()}
            variant="outline-warning"
            size="sm"
            style={{ marginLeft: "5px" }}
          >
            Export
          </Button>
        </div>
      </StyledMisc>
    </div>
  );
}

export function IpadHelp(props) {
  return (
    <TooltipWrapper id="ipad-help-div">
      <h6>
        <u>
          <strong>Left Action</strong>
        </u>
        <strong>:</strong> Column Sorting, Checkbox Actions and Button Actions
 </h6>
      <h6>
        <u>
          <strong>Middle Delete</strong>
        </u>
        <strong>:</strong> Delete Column Headers, Delete Rows
 </h6>
      <h6>
        <u>
          <strong>Right Select</strong>
        </u>
        <strong>:</strong> Select Column Headers, Select Rows
 </h6>
      <h6>
        <u>
          <strong>Sorted Column Colors</strong>
        </u>
        : Primary Sort Column = Lite Blue Background; Secondary Sort Column = Bold Blue Font
 </h6>
      <h6>
        <u>
          <strong>Selected Column</strong>
        </u>
        : Left/Right Buttons Rearrange
 </h6>
      <h6>
        <u>
          <strong>Cell History Display :</strong>
        </u>
        <strong>Left Action</strong>: Displays up to the last 10 cell value history changes/time.
 </h6>
      <h6>
        <u>
          <strong>Cell Contents Notification</strong>
        </u>
        : A red border box will be placed around the cell if recently updated/refreshed.
 </h6>
      <h6>
        <u>
          <strong>Show Selected Toggle Button</strong>
        </u>
        : Show Only Selected Rows (Underlined Rows)
 </h6>
      <h6>
        <u>
          <strong>Hide Selected Toggle Button</strong>
        </u>
        : Hide Selected Rows (Underlined Rows)
 </h6>
      <h6>
        <strong>
          <u>Reset Columns Button</u>:{' '}
        </strong>
        Reset All Deleted and Rearranged Columns to Original Load
 </h6>
      <h6>
        <strong>
          <u>Reset Flights Button</u>:{' '}
        </strong>
        Reset All Selected, Hidden, Deleted Flights (Rows) to Original Load
 </h6>
      <h6>
        <strong>
          <u>Auto Sizing Toggle Button</u>:{' '}
        </strong>
        Makes the Website Resizable for Dynamic Screen Sizes
 </h6>
      <h6>
        <strong>
          <u>Auto Refresh Toggle Button</u>:{' '}
        </strong>
        Check every minute for List Updates
 </h6>
      <h6>
        <strong>
          <u>Home Button</u>:{' '}
        </strong>
        Redirects to the RMAS Lite Site Selection Page
 </h6>
      <h6>
        <strong>
          <u>Other Lists Drop Down</u>:{' '}
        </strong>
        Allows for quick selection of other RMAS Lite lists
 </h6>
      <h6>
        <strong>
          <u>Flight/Maint/Spare/Open Checkboxs</u>:{' '}
        </strong>
        Shows Displayed Table Count or Unchecked Shows Total Available
 </h6>
    </TooltipWrapper>
  );
}

export function PrintButton(props) {
  return (
    <Button className={props.className} onClick={() => window.print()}>
      {props.text}
    </Button>
  );
}

export function GenericButton(props) {
  return (
    <span id={props.id} className={props.className}>
      <p>{props.text}</p>
    </span>
  );
}

export function Thead(props) {
  return (
    <thead>
      <tr>
        {props.columns.map((item, i) => (
          <th
            key={i}
            className={item.includes(";") ? item.split(";")[1].trim() : ""}
          >
            {item.includes(";") ? item.split(";")[0].trim() : item}
          </th>
        ))}
      </tr>
    </thead>
  );
}
