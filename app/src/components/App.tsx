import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { events, eventsEdges } from '../models/events'
import EventGraph from './EventGraph'
import EventList from './EventList'
import EventsByType from './EventsByType'
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
    flexShrink: 0,
    padding: 4,
    width: 440
  },
  tabContainer: {
    marginTop: 6
  }
})

class App extends React.Component<IAppProps> {
  public state = {
    rightTabIdx: 0
  }

  public render() {
    const { classes } = this.props
    const { rightTabIdx } = this.state
    
    return (
      <Router>
        <div>
          <TopBar />
          <div className={classes.content}>
            <Paper className={classes.leftPanel} >
              <EventGraph eventsEdges={eventsEdges} />
            </Paper>
            <Paper className={classes.rightPanel}>
              <Tabs value={rightTabIdx} onChange={this.changeRightTab} fullWidth={true}>
                <Tab label='Event list' />
                <Tab label='Events by type' />
              </Tabs>
              <div className={classes.tabContainer}>
                {rightTabIdx === 0 && <EventList events={events} />}
                {rightTabIdx === 1 && <EventsByType events={events} />}
              </div>
            </Paper>
          </div>
        </div>
      </Router>
    );
  }

  private changeRightTab = (e: React.ChangeEvent, idx: number) => {
    this.setState({ rightTabIdx: idx });
  }
}

interface IAppProps extends WithStyles<typeof styles>{

}

export default withStyles(styles)(App)
