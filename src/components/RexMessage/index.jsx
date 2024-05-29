import React from 'react';
import { Grid, Typography } from '@mui/material';
import ChatStyles from '../../styles/chat';

const RexMessage = ({ rexMessage }) => {
  return (
    <Grid container {...ChatStyles.rexMessageContainer}>
      <Typography {...ChatStyles.rexMessageText}>{rexMessage}</Typography>
    </Grid>
  );
};

export default RexMessage;
