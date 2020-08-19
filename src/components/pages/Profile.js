import React from 'react';

// Import custom Component
import Navbar from '../ui/Navbar';

// Import material-ui Component
import Box from '@material-ui/core/Box';

const Profile = () => {
  // link for documentation for update a firebase profile
  // https://firebase.google.com/docs/auth/web/manage-users?hl=fr

  return (
    <Box>
      <Navbar />
      <div>Profile page</div>
    </Box>
  );
};

export default Profile;
