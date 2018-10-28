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