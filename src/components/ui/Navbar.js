import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState, userState } from '../../atom/authAtom';
import firebase from 'firebase';

// Import Custom Component
import CustomBtn from './CustomBtn';
import CustomDrawer from '../ui/CustomDrawer';

// Import material-ui Component
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import PersonIcon from '@material-ui/icons/Person';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

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
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  linkWithIcon: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: 5,
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '0.5px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const Navbar = (props) => {
  const classes = useStyles();
  const [auth, setAuth] = useRecoilState(authState);
  const [user, setUser] = useRecoilState(userState);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        setAuth(true);
        // console.log(user);
        setUser({
          displayName: user.displayName,
          email: user.email,
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
          photoURL: user.photoURL,
          uid: user.uid,
          token: user.getIdToken(),
          provider: user.providerData[0].providerId,
        });
      }
    });
  }, [anchorEl]);

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setAnchorEl(null);
        setAuth(false);
        props.history.push('/');
      })
      .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      <Box className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Link exact to='/' className={classes.title}>
              <Typography variant='h6'>The Movie App</Typography>
            </Link>
            {auth === true ? (
              <Box>
                <IconButton
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleClick}
                  color='inherit'>
                  <StyledBadge
                    overlap='circle'
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    variant='dot'>
                    <Avatar
                      alt={user.displayName}
                      src={user.photoURL}
                      className={classes.small}
                    />
                  </StyledBadge>
                </IconButton>
                <Menu
                  id='simple-menu'
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}>
                  <MenuItem onClick={handleClose}>
                    <Link to='/profile' className={classes.linkWithIcon}>
                      <PersonIcon />
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      to='/profile/favorites'
                      className={classes.linkWithIcon}>
                      <BookmarkIcon />
                      Favorites
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={logout} className={classes.linkWithIcon}>
                    <PowerSettingsNewIcon />
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box>
                <Link to='/auth'>
                  <CustomBtn
                    variant='outlined'
                    color='inherit'
                    content='Login'
                  />
                </Link>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <CustomDrawer opened={openDrawer} closed={toggleDrawer(false)} />
    </Fragment>
  );
};

export default withRouter(Navbar);
