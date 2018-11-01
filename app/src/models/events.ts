import ColorHash from 'color-hash'
import consumers from '../data/consumers'
import baseEvents from '../data/events'

export const events: IEnhancedEvent[] = baseEvents
  .map(cleanupEvent)
  .map(enhanceEvent)

export const eventsEdges: IEventEdge[] = getEventEdges()

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
  return { ...event, shortName, initiales, color}
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
      const key = `${event.appId}#${consumer}#${event.name}`
      if (!edges.has(key)) {
        edges.set(key, { fromApp: event.appId, toApp: consumer, events: [] })
      }
      const value = edges.get(key) as IEventEdge
      value.events.push(event)
      edges.set(key, value)
    })
  })

  return Array.from(edges.values())
}