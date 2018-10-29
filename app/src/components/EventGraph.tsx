import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import * as _ from 'lodash'
import * as React from 'react'
import VisNetwork from './VisNetwork'

const styles = createStyles({
})

const EventGraph = ({ events }: IEventGraphProps) => {
  const nodes = _.uniq(_.flatten(events.map(e => [e.fromApp, e.toApp]))).map(app => ({
    id: app,
    label: app
  }))
  const edges = events.map(event => ({
    from: event.fromApp,
    to: event.toApp,
    value: 1 // event.events.length
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
    }
  }

  return (
    <div>
      <VisNetwork
        nodes={nodes}
        edges={edges}
        options={options}
      />
    </div>
  )
}

interface IEventGraphProps extends WithStyles<typeof styles> {
  events: IEventEdge[]
}

export default withStyles(styles)(EventGraph)