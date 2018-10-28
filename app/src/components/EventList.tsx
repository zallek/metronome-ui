import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Tooltip from '@material-ui/core/Tooltip'
import { WhiteSpaceProperty } from 'csstype'
import * as React from 'react'
import { IEnhancedEvent } from '../types/Event'

const elipsis = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap' as WhiteSpaceProperty
}

const styles = ({ palette }: Theme) => createStyles({
  appId: {
    padding: 4,
    width: 150,
    ...elipsis
  },
  avatar: {
    borderRadius: 0,
    color: '#fff',
    fontSize: '12px',
    height: 20,
    padding: 4
  },
  listItem: {
    alignItems: 'center',
    display: 'flex',
    padding: 2
  },
  root: {
    backgroundColor: palette.background.paper,
    fontSize: '12px',
    maxWidth: 360
  },
  sessionId: {
    padding: 4,
    width: 200,
    ...elipsis
  },
  uniqueId: {
    padding: 4,
    width: 200,
    ...elipsis
  }
})

const EventList = ({ classes, events }: IEventListProps) =>
  <div className={classes.root}>
    <div>
      {events.slice(0, 20).map(event =>
        <div key={event.uniqueId} className={classes.listItem}>
          <div>
            <Tooltip title={event.shortName}>
              <Avatar className={classes.avatar} style={{ backgroundColor: event.color }}>{event.initiales}</Avatar>
            </Tooltip>
          </div>
          <div>{event.timestamp}</div>
          <div className={classes.appId}>{event.appId}</div>
          <div className={classes.uniqueId}>{event.uniqueId}</div>
          <div className={classes.sessionId}>{event.sessionId}</div>
        </div>
      )}
    </div>
  </div>

interface IEventListProps extends WithStyles<typeof styles> {
  events: IEnhancedEvent[]
}

export default withStyles(styles)(EventList)