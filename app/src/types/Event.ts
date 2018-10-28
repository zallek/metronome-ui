export interface IEvent {
  appId: string
  name: string
  sessionId: string
  timestamp: string
  uniqueId: string
}

export interface IEnhancedEvent extends IEvent {
  shortName: string,
  initiales: string,
  color: string
}