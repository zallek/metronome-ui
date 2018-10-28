import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import { WhiteSpaceProperty } from 'csstype'
import * as React from 'react'
import { IEnhancedEvent } from '../types/Event'

const elipsis = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap' as WhiteSpaceProperty
}

const styles = createStyles({
  appId: {
    padding: 4,
    width: 100,
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
    fontSize: '12px',
    maxWidth: 420
  },
  sessionId: {
    flexGrow: 0,
    flexShrink: 0,
    padding: 4,
    width: 60,
    ...elipsis
  },
  timestamp: {
    padding: 4,
    width: 180
  },
  uniqueId: {
    flexGrow: 0,
    flexShrink: 0,
    padding: 4,
    width: 60,
    ...elipsis
  }
})

const ShortUUID = ({ uuid }: IShortUUIDProps) => {
  const splits = uuid.split('-')
  const shorten = splits.length === 5 ? splits[0] : null
  return (
    <Tooltip title={uuid}>
      <span>{shorten || '<invalid>'}</span>
    </Tooltip>
  )
}

interface IShortUUIDProps {
  uuid: string
}

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
          <div className={classes.timestamp}>{event.timestamp.slice(0, -5)}</div>
          <div className={classes.appId}>{event.appId}</div>
          <div className={classes.uniqueId}><ShortUUID uuid={event.uniqueId} /></div>
          <div className={classes.sessionId}><ShortUUID uuid={event.sessionId} /></div>
        </div>
      )}
    </div>
  </div>

interface IEventListProps extends WithStyles<typeof styles> {
  events: IEnhancedEvent[]
}

export default withStyles(styles)(EventList)