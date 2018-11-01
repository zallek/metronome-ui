import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import * as _ from 'lodash'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { updateFocus } from '../utils/navigation'
import VisNetwork from './VisNetwork'

const styles = createStyles({
  root: {
    backgroundColor: '#222222'
  }
})

class EventGraph extends React.Component<IEventGraphProps, IEventGraphState> {
  public state = {
    ...this.updateGraph()
  }

  public render () {
    const { classes } = this.props
    const { edges, nodes, options } = this.state

    return (
      <div className={classes.root}>
        <VisNetwork
          nodes={nodes}
          edges={edges}
          options={options}
          events={{
            select: this.onSelectionChange
          }}
        />
      </div>
    )
  }

  private updateGraph() {
    const { eventsEdges } = this.props

    const nodes = _.chain(eventsEdges)
      .map(e => [e.from, e.to])
      .flatten()
      .uniq()
      .map((app, i) => ({
        // group: String(i),
        id: app,
        label: app
      }))
      .value()
    const edges = eventsEdges.map(edge => ({
      color: { color: edge.events[0].color },
      from: edge.from,
      id: edge.id,
      to: edge.to,
      value: edge.events.length
    }))

    const options = {
      edges: {
        arrows: 'to'
      },
      nodes: {
        font: {
          color: '#fff',
        },
        shape: 'dot'
      },
      physics: {
        solver: 'forceAtlas2Based'
      }
    }

    return { edges, nodes, options }
  }

  private onSelectionChange = ({ edges, nodes }: VisNetworkEventClick) => {
    const { history } = this.props

    const newFocus = nodes.length > 0 ? { focusedNode: nodes[0] }
      : edges.length > 0 ? { focusedEdge: edges[0] }
      : null

    updateFocus(history, newFocus)
  }
}

interface IEventGraphProps extends WithStyles<typeof styles>, RouteComponentProps {
  eventsEdges: IEventEdge[]
}

interface IEventGraphState {
  nodes: vis.Node[]
  edges: vis.Edge[]
  options: vis.Options
}

export default withRouter(withStyles(styles)(EventGraph))