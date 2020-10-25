import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useDispatch, useSelector} from 'react-redux'
import Drawer from '../components/Drawer'
import {onSetDrawer} from '../state/ducks/ui'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Layout(props) {
  const classes = useStyles();
  const {drawer} = useSelector(state => state.ui)
  const dispatch = useDispatch()

  const openDrawer = () => {
    dispatch(onSetDrawer(true))
  }

  

  return (
    <div className={classes.root}>
      <Drawer show={drawer} />

      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={openDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Pcat
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <div>
        {props.children}
      </div>
    </div>
  );
}