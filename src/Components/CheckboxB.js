import React, { Component } from "react";
import InputGroup from "react-bootstrap/InputGroup";

class CheckboxShiftB extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {
      isChecked: null
    };
  }

  handler() {
    this.props.onCheck(this.props.name);
  }

  render() {
    return (
      <div className={"shift"}>
        <InputGroup size="sm" className={this.props.lClassName}>
          {/* <InputGroup.Prepend> */}
          <InputGroup.Checkbox
            name={this.props.name}
            checked={this.props.checked}
            onChange={this.handler}
          />
          {this.props.inputText}
          {/* </InputGroup.Prepend> */}
          <p className={this.props.pClassName}>{this.props.pText}</p>
        </InputGroup>
      </div>
    );
  }
}

// export default function CheckboxFunction(props) {
//   return (
//     <div>
//       <label>
//         <input
//           type="checkbox"
//           name={props.name}
//           checked={props.checked}
//           onChange={props.onCheck}
//         />
//         {props.text}
//       </label>
//     </div>
//   );
// }

export default CheckboxShiftB;
