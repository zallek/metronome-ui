import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import * as React from 'react'
import { fromEdgeKey } from '../models/events'

const styles = createStyles({
  
})

const EventFocus = ({ classes, focus }: IEventTagProps) => {
  const text = (): string | null => {
    if (!focus) {
      return 'All events'
    }
    if ((focus as IEventFocusNode).focusedNode) {
      const focusNode = (focus as IEventFocusNode)
      return `Events produced by ${focusNode.focusedNode}`
    }
    if ((focus as IEventFocusEdge).focusedEdge) {
      const focusEdge = (focus as IEventFocusEdge)
      const { producer, shortName, consumer } = fromEdgeKey(focusEdge.focusedEdge)
      return `${shortName} from ${producer} to ${consumer}`
    }
    return null
  }

  return <div>{text()}</div>
}

interface IEventTagProps extends WithStyles<typeof styles> {
  focus: IEventFocus
}

export default withStyles(styles)(EventFocus)