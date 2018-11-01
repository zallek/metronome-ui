import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import * as _ from 'lodash'
import * as React from 'react'
import VisNetwork from './VisNetwork'

const styles = createStyles({
  root: {
    backgroundColor: '#222222'
  }
})

class EventGraph extends React.Component<IEventGraphProps> {
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
        />
      </div>
    )
  }

  private updateGraph() {
    const { eventsEdges } = this.props

    const nodes = _.chain(eventsEdges)
      .map(e => [e.fromApp, e.toApp])
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
      from: edge.fromApp,
      to: edge.toApp,
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
}

interface IEventGraphProps extends WithStyles<typeof styles> {
  eventsEdges: IEventEdge[]
}

export default withStyles(styles)(EventGraph)