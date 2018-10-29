import * as React from 'react'
import Network from 'vis/lib/network/Network'

import 'vis/dist/vis.css'

class VisNetwork extends React.Component<IVisNetworkProps> {
  public static defaultProps = {
    edges: [],
    events: {},
    options: {}
  }

  private network: vis.Network
  private networkNode: Node | null

  public componentDidMount() {
    this.updateNetwork(this.props as IVisNetworkProps)
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
    const { style } = this.props

    return (
      <div
        className='VisNetwork'
        ref={ref => { this.networkNode = ref }}
        style={style}
      />
    )
  }

  private updateNetwork(props: IVisNetworkProps) {
    const { nodes, edges, options } = props

    this.network = new Network(this.networkNode, { edges, nodes }, options)
    this.network.setOptions(options)
  }
}

interface IVisNetworkProps {
  nodes: vis.Node[]
  edges: vis.Edge[]
  options: object,
  style?: object
}

export default VisNetwork
