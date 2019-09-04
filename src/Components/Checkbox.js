import React, { Component } from 'react'

class CheckboxShift extends Component {
  constructor(props) {
    super(props)
    this.handler = this.handler.bind(this)
  }

  handler() {
    this.props.onCheck(this.props.name)
  }

  render() {
    return (
      <div id={this.props.id} className={'shift'}>
        <label style={this.props.style} className={this.props.lClassName}>
          <input
            type="checkbox"
            name={this.props.name}
            onChange={this.handler}
            checked={this.props.shiftActive}
            disabled={this.props.isDisabled}
          />
          {this.props.inputText}
        </label>
        <p style={this.props.style} className={this.props.pClassName}>
          {this.props.pText}
        </p>
      </div>
    )
  }
}

export default CheckboxShift
