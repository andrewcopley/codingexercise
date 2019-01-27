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
        console.log('RESPONSE: ', response)
        this.setState({ data: response.data })
        this.setState({ username: response.data[0].title })
        console.log('YYYYYYYYY: ', this.state.data)
        this.state.data.map((function (item) {
          axios.get(`https://d2snwnmzyr8jue.cloudfront.net/${item.artKey}_270.jpeg`)
            .then((response) => {
              console.log('PICTURE RESPONSE: ', response)
              this.state.pictures.push(`https://d2snwnmzyr8jue.cloudfront.net/${item.artKey}_270.jpeg`)
            })
            .catch((error) => {
              console.log(error)
            })
        }));
      })
      .catch((error) => {
        console.log(error)
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
      <div class="grid-container">
        <ul>
          {info}
        </ul>
      </div>
    )
  }
}

export default App
