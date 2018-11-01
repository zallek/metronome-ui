import ColorHash from 'color-hash'
import * as _ from 'lodash'
import consumers from '../data/consumers'
import baseEvents from '../data/events'

export const events: IEnhancedEvent[] = _.chain(baseEvents)
  .uniqBy(event => event.uniqueId)
  .sortBy(event => event.timestamp)
  .map(cleanupEvent)
  .map(enhanceEvent)
  .value()

export const eventsEdges: IEventEdge[] = getEventEdges()

export function filteredEvents(focus: IEventFocus): IEnhancedEvent[] {
  return events
    .filter(focusPredicate(focus))
}

const focusPredicate = (focus: IEventFocus) => (event: IEnhancedEvent): boolean => {
  if (!focus) {
    return true
  }
  if ((focus as IEventFocusNode).focusedNode) {
    const focusNode = focus as IEventFocusNode
    return event.appId === focusNode.focusedNode
  }
  if ((focus as IEventFocusEdge).focusedEdge) {
    const focusEdge = focus as IEventFocusEdge
    const { producer, shortName } = fromEdgeKey(focusEdge.focusedEdge)
    return event.appId === producer && event.shortName === shortName
  }
  return false
}

function cleanupEvent(event: IEvent): IEvent {
  const lAppId = event.appId.toLowerCase()
  const appId = lAppId.startsWith('cerberus-jaw') ? 'cerberus-jaw' : lAppId
  return { ...event, appId }
}

function enhanceEvent(event: IEvent): IEnhancedEvent {
  const colorHash = new ColorHash()
  const shortName = event.name.replace('com.tinyclues.events.', '')
  const nameParts = event.name.split('.')
  const initiales = nameParts[nameParts.length - 1]
    .replace(/Event$/, '')
    .replace(/[^A-Z]/g, '')
    .slice(0, 4)
  const color = colorHash.hex(shortName)
  return { ...event, shortName, initiales, color }
}

function getEventEdges(): IEventEdge[] {
  const consumersByEventName = {}
  Object.keys(consumers).forEach((consumer: string) => {
    consumers[consumer].forEach((eventName: string) => {
      if (!consumersByEventName[eventName]) { consumersByEventName[eventName] = [] }
      consumersByEventName[eventName].push(consumer)
    })
  })

  const edges = new Map<string, IEventEdge>()
  events.forEach(event => {
    (consumersByEventName[event.name] || []).forEach((consumer: string) => {
      const producer = event.appId
      const key = toEdgeKey(producer, event.shortName, consumer)
      if (!edges.has(key)) {
        edges.set(key, { id: key, from: producer, to: consumer, events: [] })
      }
      const value = edges.get(key) as IEventEdge
      value.events.push(event)
      edges.set(key, value)
    })
  })

  return Array.from(edges.values())
}

function toEdgeKey(producer: string, shortName: string, consumer: string): string {
  return `${producer}#${shortName}#${consumer}`
}

export function fromEdgeKey(key: string): { producer: string, shortName: string, consumer: string } {
  const [producer, shortName, consumer] = key.split('#')
  return { producer, shortName, consumer }
}