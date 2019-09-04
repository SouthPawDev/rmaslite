import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'

class CheckboxShiftB extends Component {
  constructor(props) {
    super(props)
    this.handler = this.handler.bind(this)
    this.state = {
      isChecked: null
    }
  }

  handler() {
    this.props.onCheck(this.props.name)
  }

  render() {
    return (
      <div className={'shift'}>
        <InputGroup size="sm" className={this.props.lClassName}>
          <InputGroup.Checkbox
            name={this.props.name}
            checked={this.props.checked}
            onChange={this.handler}
          />
          {this.props.inputText}

          <p className={this.props.pClassName}>{this.props.pText}</p>
        </InputGroup>
      </div>
    )
  }
}

export default CheckboxShiftB
