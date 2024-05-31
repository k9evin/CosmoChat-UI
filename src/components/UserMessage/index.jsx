import React from 'react';
import { Grid, Typography } from '@mui/material';
import chatStyles from '../../styles/chat';

const UserMessage = ({ userMessage }) => {
  return (
    <Grid container {...chatStyles.userMessageContainer}>
      <Typography {...chatStyles.userMessageText}>{userMessage}</Typography>
    </Grid>
  );
};

export default UserMessage;
