import React from 'react';
import { NavLink } from 'react-router-dom';

// Import material-ui Component
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import TvIcon from '@material-ui/icons/Tv';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const CustomDrawer = ({ opened, closed }) => {
  const classes = useStyles();
  return (
    <Drawer anchor='left' open={opened} onClose={closed}>
      <div
        role='presentation'
        onClick={closed}
        onKeyDown={closed}
        className={classes.list}>
        <List>
          <NavLink exact to='/' activeClassName='active'>
            <ListItem button style={{ color: 'black' }}>
              <ListItemIcon style={{ color: 'black' }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
          </NavLink>
          <NavLink exact to='/movies' activeClassName='active'>
            <ListItem button style={{ color: 'black' }}>
              <ListItemIcon style={{ color: 'black' }}>
                <LocalMoviesIcon />
              </ListItemIcon>
              <ListItemText primary='Movies' />
            </ListItem>
          </NavLink>
          <NavLink exact to='/tv' activeClassName='active'>
            <ListItem button style={{ color: 'black' }}>
              <ListItemIcon style={{ color: 'black' }}>
                <TvIcon />
              </ListItemIcon>
              <ListItemText primary='TV' />
            </ListItem>
          </NavLink>
        </List>
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
