import React from 'react';

// Import material-ui Component
import Button from '@material-ui/core/Button';

const CustomBtn = ({ variant, color, onclick, content }) => {
  return (
    <Button variant={variant} onClick={onclick} color={color}>
      {content}
    </Button>
  );
};

export default CustomBtn;
