import React from 'react';
import { Grid, Typography } from '@mui/material';
import ChatStyles from '../../styles/chat';

const UserMessage = ({ userMessage }) => {
  return (
    <Grid container {...ChatStyles.userMessageContainer}>
      <Typography {...ChatStyles.userMessageText}>{userMessage}</Typography>
    </Grid>
  );
};

export default UserMessage;
