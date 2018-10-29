import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import * as React from 'react'
import { events, eventsEdges } from '../utils/events'
import EventGraph from './EventGraph'
import EventList from './EventList'
import TopBar from './TopBar'

const styles = createStyles({
  content: {
    display: 'flex',
    padding: 12
  },
  leftPanel: {
    flexGrow: 1,
    marginRight: 12
  },
  rightPanel: {
    flexGrow: 0,
    padding: 4,
    width: 420
  }
})

// console.log(eventsEdges) // tslint:disable-line

class App extends React.Component<IAppProps> {
  public render() {
    const { classes } = this.props
    return (
      <div>
        <TopBar />
        <div className={classes.content}>
          <Paper className={classes.leftPanel} >
            <EventGraph events={eventsEdges} />
          </Paper>
          <Paper className={classes.rightPanel}>
            <EventList events={events} />
          </Paper>
        </div>
      </div>
    );
  }
}

interface IAppProps extends WithStyles<typeof styles>{

}

export default withStyles(styles)(App)
