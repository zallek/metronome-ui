declare interface IEvent {
  appId: string
  name: string
  sessionId: string
  timestamp: string
  uniqueId: string
}

declare interface IEnhancedEvent extends IEvent {
  shortName: string,
  initiales: string,
  color: string
}

declare interface IEventEdge {
  fromApp: string,
  toApp: string,
  events: IEnhancedEvent[]
}
