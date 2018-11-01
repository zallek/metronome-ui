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
  fromApp: string
  toApp: string
  events: IEnhancedEvent[]
}

declare interface IEventFilter {
  apps?: string[]
  events?: string[]
  sessionId?: string
  fromDate?: string
  toDate?: string
}

declare interface IEventNodeFocus {
  app: string
}

declare type IEventEdgeFocus = IEventEdge

declare type IEventFocus = IEventNodeFocus | IEventEdgeFocus | null
