import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'

const styles = createStyles({
  root: {
    flexGrow: 1,
  },
})

const TopBar = ({ classes }: ITopBarProps) =>
  <div className={classes.root}>
    <AppBar position='static' color='default'>
      <Toolbar>
        <Typography variant='title' color='inherit'>
          Metronome
        </Typography>
      </Toolbar>
    </AppBar>
  </div>

interface ITopBarProps extends WithStyles<typeof styles> {
}

export default withStyles(styles)(TopBar)