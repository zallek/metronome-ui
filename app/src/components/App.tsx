import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import ColorHash from 'color-hash'
import * as React from 'react'
import events from '../data/events'
import { IEnhancedEvent, IEvent } from '../types/Event'
import EventList from './EventList'
import TopBar from './TopBar'

const colorHash = new ColorHash();

const eEvents: IEnhancedEvent[] = events.map(enhanceEvent)

function enhanceEvent(event: IEvent): IEnhancedEvent {
  const shortName = event.name.replace('com.tinyclues.events.', '')
  const nameParts = event.name.split('.')
  const initiales = nameParts[nameParts.length - 1]
    .replace(/Event$/, '')
    .replace(/[^A-Z]/g, '')
    .slice(0, 4)
  const color = colorHash.hex(shortName)
  return { ...event, shortName, initiales, color }
}

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
            <EventList events={eEvents} />
          </Paper>
        </div>
      </div>
    );
  }
}

interface IAppProps extends WithStyles<typeof styles>{

}

export default withStyles(styles)(App)
