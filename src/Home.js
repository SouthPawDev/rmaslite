import React, { Component } from 'react'
import Station from './Station'
import { version } from './properties'

import './Home.css'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      file: ''
    }
  }

  handleUpload(e) {
    let reader = new FileReader()
    let file = e.target.files[0]

    var load = document.getElementById('load')
    var notAllowed = document.getElementById('notAllowed')

    if (file) {
      if (file.name.slice(-3) === 'csv') {
        if (!notAllowed.classList.contains('hidden')) {
          notAllowed.classList.add('hidden')
        }

        reader.onloadend = () => {
          this.setState({
            file: reader.result.split('\n')
          })
        }

        reader.readAsText(file)
        load.classList.remove('hidden')
      } else {
        if (!load.classList.contains('hidden')) {
          load.classList.add('hidden')
        }
        notAllowed.classList.remove('hidden')
      }
    }
    if (!file) {
      load.classList.add('hidden')
      notAllowed.classList.add('hidden')
    }
  }

  render() {
    return (
      <div className="Home">
        <div className="row">
          <h1>
            RMAS{' '}
            <i>
              Lite
              <br />
            </i>
          </h1>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <p> {'v' + version} </p>
          </div>
        </div>

        <div className="row">
          <Station station="MEM" />
          <Station station="OAK" />
          <Station station="AFW" />
          <Station station="IND" />
        </div>

        <div className="row">
          <Station station="EWR" />
          <Station station="CDG" />
          <Station station="CAN" />
          <Station station="GSO" />
        </div>
      </div>
    )
  }
}

export default Home
