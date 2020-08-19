import React, { useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import '../../utils/firebase-config';
import { useRecoilValue } from 'recoil';
import { authState } from '../../atom/authAtom';
import { withRouter } from 'react-router-dom';

// Impoprt custom Component
import Navbar from '../ui/Navbar';

// Import material-ui Component
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

const Auth = (props) => {
  const auth = useRecoilValue(authState);

  useEffect(() => {
    if (auth === true) {
      props.history.goBack();
      // console.log(props);
    }
  }, [auth]);

  return (
    <Box>
      <Navbar />
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
        style={{ height: 'calc(100vh - 75px)' }}>
        <Typography variant='h5'>Login</Typography>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </Grid>
    </Box>
  );
};

export default withRouter(Auth);
