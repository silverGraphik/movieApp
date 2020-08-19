import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atom/authAtom';

// Import custom Component
import Navbar from '../ui/Navbar';

// Import material-ui Component
import Box from '@material-ui/core/Box';

const Home = () => {
  const user = useRecoilValue(userState);

  // console.log(user);

  return (
    <Box>
      <Navbar />
      This is the home of the Application
    </Box>
  );
};

export default Home;
