import ColorHash from 'color-hash'
import _ from 'lodash'
import consumers from '../data/consumers'
import baseEvents from '../data/events'

export const events: IEnhancedEvent[] = baseEvents.map(enhanceEvent)

export const eventsEdges: IEventEdge[] = []

function enhanceEvent(event: IEvent): IEnhancedEvent {
  const colorHash = new ColorHash()
  const shortName = event.name.replace('com.tinyclues.events.', '')
  const nameParts = event.name.split('.')
  const initiales = nameParts[nameParts.length - 1]
    .replace(/Event$/, '')
    .replace(/[^A-Z]/g, '')
    .slice(0, 4)
  const color = colorHash.hex(shortName)
  return { ...event, shortName, initiales, color }
}

function getEventEdges(): IEventEdge[] {
  const consumersByEventName: object = _.reduce(consumers, (acc: object, eventNames: string[], consumer: string) => {
    eventNames.forEach((eventName: string) => {
      if (!acc[eventName]) { acc[eventName] = [] }
      return { acc, [eventName]: [...acc[eventName], consumer]}
    })
    return acc
  }, {})

  const edges = new Map()
  events.forEach(event => {
    consumersByEventName[event.name].forEach((consumer: string) => {
      const key = { fromApp: event.appId, toApp: consumer }
      if (!edges.has(key)) {
        edges.set(key, { ...key, events: [] })
      }
      edges.set(key, { ...edges.get(key), events: [...edges.get(key).events, event] })
    })
  })

  return edges.values()
}