import ColorHash from 'color-hash'
import * as React from 'react'
import events from '../data/events'
import { IEnhancedEvent, IEvent } from '../types/Event'
import EventList from './EventList'
import TopBar from './TopBar'

const colorHash = new ColorHash();

const eEvents: IEnhancedEvent[] = events.map(enhanceEvent)

function enhanceEvent(event: IEvent): IEnhancedEvent {
  const shortName = event.name.replace('com.tinyclues.events.', '')
  const nameParts = event.name.split('.')
  const initiales = nameParts[nameParts.length - 1]
    .replace(/Event$/, '')
    .replace(/[^A-Z]/g, '')
    .slice(0, 4)
  const color = colorHash.hex(shortName)
  return { ...event, shortName, initiales, color }
}

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <TopBar />
        <EventList events={eEvents} />
      </div>
    );
  }
}

export default App
