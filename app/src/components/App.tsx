import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { eventsEdges, filteredEvents } from '../models/events'
import { getFocus } from '../utils/navigation'
import EventFocus from './EventFocus'
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
    const { classes, location } = this.props
    const { rightTabIdx } = this.state

    const focus = getFocus(location)
    const fEvents = filteredEvents(focus)
    
    return (
      <div>
        <TopBar />
        <div className={classes.content}>
          <Paper className={classes.leftPanel} >
            <EventGraph eventsEdges={eventsEdges} />
          </Paper>
          <Paper className={classes.rightPanel}>
            <EventFocus focus={focus} />
            <Tabs value={rightTabIdx} onChange={this.changeRightTab} fullWidth={true}>
              <Tab label='Event list' />
              <Tab label='Events by type' />
            </Tabs>
            <div className={classes.tabContainer}>
              {rightTabIdx === 0 && <EventList events={fEvents} />}
              {rightTabIdx === 1 && <EventsByType events={fEvents} />}
            </div>
          </Paper>
        </div>
      </div>
    )
  }

  private changeRightTab = (e: React.ChangeEvent, idx: number) => {
    this.setState({ rightTabIdx: idx });
  }
}

interface IAppProps extends WithStyles<typeof styles>, RouteComponentProps {

}

export default withStyles(styles)(App)
