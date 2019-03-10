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
  margin: 0px 20px 0px 20px;
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
  margin: 10px;
`;

const Help = styled(Button)``;

export function Misc(props) {
  const displayHelpHelpHandler = () => {
    props.displayHelp();
  };
  return (
    <div>
      <TooltipWrapper isHidden={props.help}>
        <h5>
          <u>
            <strong>Column Headers</strong>
          </u>
          : <strong>Left Click:</strong> Sort, <strong>Middle Click:</strong>{" "}
          Delete, <strong>Right Click:</strong> Select,{" "}
          <strong>Selected Column:</strong> Left/Right Arrows Keys Rearrange
        </h5>
        <h5>
          <u>
            <strong>Rows</strong>
          </u>
          : <strong>Middle Click:</strong> Delete, <strong>Right Click:</strong>{" "}
          Underline/Select
        </h5>
      </TooltipWrapper>
      <StyledMisc>
        <MiscArrayDiv>
          {props.misc
            .filter(i => i.trim() !== "" && i !== "^^^^^")
            .map((i, ii) => (
              <p
                style={{ padding: "0 2px 0 2px" }}
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
        </div>
      </StyledMisc>
    </div>
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
