import React, { Component } from 'react'
import ColorHash from 'color-hash'
import TopBar from './TopBar'
import events from '../data/events.json'
import './App.css'
import EventList from './EventList';

var colorHash = new ColorHash();
const eEvents = events.map(event => {
  const shortName = event.name.replace('com.tinyclues.events.', '')
  const nameParts = event.name.split('.')
  const initiales = nameParts[nameParts.length - 1]
    .replace(/Event$/, '')
    .replace(/[^A-Z]/g, '')
    .slice(0, 4)
  const color = colorHash.hex(shortName)
  return { ...event, shortName, initiales, color }
}).sort((a, b) => a.timestamp - b.timestamp)

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
        <EventList events={eEvents} />
      </div>
    );
  }
}

export default App
