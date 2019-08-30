import styled from "styled-components";

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
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    margin-left: ${props => (props.jj >= 18 ? "-6em" : "-1em")};
  }
`;

export default TipDiv;
