import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import { Hidden } from '@material-ui/core';

const elipsis = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
}

const styles = theme => ({
  root: {
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    fontSize: '12px'
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: 2
  },
  avatar: {
    padding: 4,
    color: '#fff',
    fontSize: '12px',
    height: 20,
    borderRadius: 0
  },
  uniqueId: {
    width: 200,
    padding: 4,
    ...elipsis
  },
  sessionId: {
    width: 200,
    padding: 4,
    ...elipsis
  },
  appId: {
    width: 150,
    padding: 4,
    ...elipsis
  }
})

const EventList = ({ classes, events }) =>
  <div className={classes.root}>
    <div>
      {events.slice(0, 20).map(event =>
        <div className={classes.listItem}>
          <div>
            <Tooltip title={event.shortName}>
              <Avatar className={classes.avatar} style={{ backgroundColor: event.color }}>{event.initiales}</Avatar>
            </Tooltip>
          </div>
          <div className={classes.timestamp}>{event.timestamp}</div>
          <div className={classes.appId}>{event.appId}</div>
          <div className={classes.uniqueId}>{event.uniqueId}</div>
          <div className={classes.sessionId}>{event.sessionId}</div>
        </div>
      )}
    </div>
  </div>

EventList.propTypes = {
  classes: PropTypes.object.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
    uniqueId: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    sessionId: PropTypes.string.isRequired,
    shortName: PropTypes.string.isRequired,
    initiales: PropTypes.string.isRequired,
    appId: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  })).isRequired
}

export default withStyles(styles)(EventList)