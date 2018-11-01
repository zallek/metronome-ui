import * as React from 'react'
import { Network } from 'vis'

import 'vis/dist/vis.css'

class VisNetwork extends React.Component<IVisNetworkProps> {
  public static defaultProps = {
    edges: [],
    events: {},
    options: {}
  }

  private network: vis.Network
  private networkNode: HTMLElement

  public componentDidMount() {
    this.updateNetwork(this.props)
  }

  public componentWillReceiveProps(nextProps: IVisNetworkProps) {
    if (nextProps.nodes !== this.props.nodes || nextProps.edges !== this.props.edges) {
      this.updateNetwork(nextProps)
    }
  }

  public shouldComponentUpdate() {
    return false
  }

  public render() {
    return (
      <div
        className='VisNetwork'
        ref={ref => { this.networkNode = ref as HTMLElement }}
        style={{
          height: 650,
          width: '100%'
        }}
      />
    )
  }

  private updateNetwork(props: IVisNetworkProps) {
    const { nodes, edges, events, options } = props

    this.network = new Network(this.networkNode, { edges, nodes }, options)
    this.network.setOptions(options)

    Object.keys(events).forEach((eventName: vis.NetworkEvents) => this.network.on(eventName, events[eventName]))
  }
}

interface IVisNetworkEvents {
  select: (params: VisNetworkEventClick) => void
}

interface IVisNetworkProps {
  nodes: vis.Node[]
  edges: vis.Edge[]
  options: vis.Options
  events: IVisNetworkEvents
}

export default VisNetwork
