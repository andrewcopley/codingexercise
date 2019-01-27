import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

class App extends Component {

  constructor() {
    super()
    this.state = {
      data: [],
      pictures: [],
      error: ''
    }
  }

  componentDidMount() {
    axios.get('https://hoopla-ws-dev.hoopladigital.com/kinds/7/titles/featured?offset=0&limit=51&kindId=7', {
      headers: {
        'ws-api': '2.1'
      }
    })
      .then((response) => {
        this.setState({ data: response.data })
      })
      .catch((error) => {
        this.setState({ data: error.data })
      })
  }

  render() {
    const info = this.state.data.map(function (item) {
      return <div class="grid-item">
        <img src={`https://d2snwnmzyr8jue.cloudfront.net/${item.artKey}_270.jpeg`} ></img>
      <li> Title: {item.title} Artist: {item.artistName} </li>
      </div>
    });
    return (
      <div className="grid-container">
        <ul>
          {info}
        </ul>
      </div>
    )
  }
}

export default App
