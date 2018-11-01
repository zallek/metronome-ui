declare interface IEvent {
  appId: string
  name: string
  sessionId: string
  timestamp: string
  uniqueId: string
}

declare interface IEnhancedEvent extends IEvent {
  shortName: string
  initiales: string
  color: string
}

declare interface IEventEdge {
  id: string,
  from: string
  to: string
  events: IEnhancedEvent[]
}

declare interface IEventFilter {
  apps?: string[]
  events?: string[]
  sessionId?: string
  fromDate?: string
  toDate?: string
}

declare interface IEventFocusNode {
  focusedNode: string
}

declare interface IEventFocusEdge {
  focusedEdge: string
}

declare type IEventFocus = IEventFocusNode | IEventFocusEdge | null
