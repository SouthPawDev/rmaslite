import React from "react";
import Button from "react-bootstrap/Button";

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
  return (
    <p style={props.style} className={props.className}>
      {props.exception}
    </p>
  );
}

export function Misc(props) {
  return (
    <div className={props.className}>
      {props.misc.map((i, ii) => (
        <p
          style={{ marginRight: "20px" }}
          key={"misc" + ii}
          className={i.split(";")[i.split(";").length - 1]}
        >
          {i.split(";")[i.split(";").length - 2]}
        </p>
      ))}
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
