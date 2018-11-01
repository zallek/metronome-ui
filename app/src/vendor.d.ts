declare module 'color-hash' {
  class ColorHash {
    public hex(str: string): string;
  }

  export default ColorHash
}

declare module '*data/events' {
  interface IEvent {
    appId: string
    name: string
    sessionId: string
    timestamp: string
    uniqueId: string
  }

  const content: IEvent[]
  export default content
}

declare module '*data/consumers' {
  const content: Map<string, string[]>
  export default content
}

declare interface VisNetworkEventClick {
  nodes: string[]
  edges: string[]
}