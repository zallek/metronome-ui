import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import ColorHash from 'color-hash'
import * as React from 'react'
import { events } from '../utils/events'
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

class App extends React.Component<IAppProps> {
  public render() {
    const { classes } = this.props
    return (
      <div>
        <TopBar />
        <div className={classes.content}>
          <Paper className={classes.leftPanel}/>
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
