import React from 'react';
import { Grid, Typography } from '@mui/material';
import chatStyles from '../../styles/chat';

const RexMessage = ({ rexMessage }) => {
  return (
    <Grid container {...chatStyles.rexMessageContainer}>
      <Typography {...chatStyles.rexMessageText}>{rexMessage}</Typography>
    </Grid>
  );
};

export default RexMessage;
