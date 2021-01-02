import React from 'react'
// eslint-disable-next-line
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

// eslint-disable-next-line
const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: /*  theme.spacing(2) */ '5px',
  },
  title: {
    flexGrow: 1,
  },
}))

const GlobalBar: React.FC = () => {
  const classes = useStyles()

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            News
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default GlobalBar
