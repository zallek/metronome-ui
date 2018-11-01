import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import * as _ from 'lodash'
import * as React from 'react'
import EventList from './EventList'

const styles = ({ typography }: Theme) => createStyles({
  heading: {
    fontSize: typography.pxToRem(15),
    fontWeight: typography.fontWeightRegular,
  }
})

const EventsByType = ({ classes, events }: IEventsByTypeProps) => {
  const groups = _.chain(events)
    .groupBy(event => event.shortName)
    .toPairs()
    .orderBy(pair => pair[0])
    .slice(0, 15)
    .value()

  return (
    <div>
      {groups.map(([shortName, groupEvents]) =>
        <ExpansionPanel key={shortName}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{shortName}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <EventList events={groupEvents} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
    </div>
  )
}

interface IEventsByTypeProps extends WithStyles<typeof styles> {
  events: IEnhancedEvent[]
}

export default withStyles(styles)(EventsByType)
