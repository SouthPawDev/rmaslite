import React, { Component } from "react";

class CheckboxShift extends Component {
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
        <label className={this.props.lClassName}>
          <input
            type="checkbox"
            name={this.props.name}
            checked={this.props.checked}
            onChange={this.handler}
          />
          {this.props.inputText}
        </label>
        <p className={this.props.pClassName}>{this.props.pText}</p>
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

export default CheckboxShift;
