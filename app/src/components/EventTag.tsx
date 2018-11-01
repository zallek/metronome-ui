import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import * as React from 'react'

const styles = createStyles({
  avatar: {
    borderRadius: 0,
    color: '#fff',
    fontSize: '12px',
    height: 20
  }
})

const EventTag = ({ classes, event }: IEventTagProps) =>
  <Tooltip title={event.shortName}>
    <Avatar className={classes.avatar} style={{ backgroundColor: event.color }}>{event.initiales}</Avatar>
  </Tooltip>

interface IEventTagProps extends WithStyles<typeof styles> {
  event: IEnhancedEvent
}

export default withStyles(styles)(EventTag)