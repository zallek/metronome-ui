import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import * as React from 'react'
import EventTag from './EventTag'
import ShortUUID from './ShortUUID'

const styles = createStyles({
  avatar: {
    borderRadius: 0,
    color: '#fff',
    fontSize: '12px',
    height: 20
  },
  header: {
    '& > th': {
      padding: 4
    },
    height: 26
  },
  listItem: {
    '& > td': {
      padding: 4
    },
    height: 26
  },
  root: {
    fontSize: '12px',
    maxWidth: 420
  }
})

const EventList = ({ classes, events, max = 20 }: IEventListProps) =>
  <Table className={classes.root}>
    <TableHead>
      <TableRow className={classes.header}>
        <TableCell>Unique ID</TableCell>
        <TableCell>Type</TableCell>
        <TableCell>Timestamp</TableCell>
        <TableCell>App ID</TableCell>
        <TableCell>Session ID</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {events.slice(0, max).map(event =>
        <TableRow key={event.uniqueId} className={classes.listItem}>
          <TableCell><ShortUUID uuid={event.uniqueId} /></TableCell>
          <TableCell><EventTag event={event} /></TableCell>
          <TableCell>{event.timestamp.slice(0, -5)}</TableCell>
          <TableCell>{event.appId}</TableCell>
          <TableCell><ShortUUID uuid={event.sessionId} /></TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>

interface IEventListProps extends WithStyles<typeof styles> {
  events: IEnhancedEvent[]
  max?: number
}

export default withStyles(styles)(EventList)