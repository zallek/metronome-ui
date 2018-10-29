import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import * as _ from 'lodash'
import * as React from 'react'
import VisNetwork from './VisNetwork'

const styles = createStyles({
})

const EventGraph = ({ eventsEdges }: IEventGraphProps) => {
  const nodes = _.uniq(_.flatten(eventsEdges.map(e => [e.fromApp, e.toApp]))).map((app, i) => ({
    // group: String(i),
    id: app,
    label: app
  }))
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

  return (
    <div style={{
      backgroundColor: '#222222'
    }}>
      <VisNetwork
        nodes={nodes}
        edges={edges}
        options={options}
      />
    </div>
  )
}

interface IEventGraphProps extends WithStyles<typeof styles> {
  eventsEdges: IEventEdge[]
}

export default withStyles(styles)(EventGraph)