import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import Images from '../../constants/images';
import chatHistoryStyles from '../../styles/chatHistory';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card } from '@mui/joy';
import api from '../../api/sessions';
import styled from '@mui/material/styles/styled';
import chatStyles from '../../styles/chat';
import homeStyles from '../../styles/home';
import { useNavigate } from 'react-router-dom';

const ChatHistory = ({
  id,
  date,
  lasttext,
  sessionEnded,
  isActivity,
  isEndedChat,
  chatsLength,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    return async () => {
      try {
        await api.delete(`/sessions/${id}`);
        console.log(`Session ${id} deleted successfully!`);
        window.location.reload();
      } catch (err) {
        console.error('An error occurred:', err);
      }
      handleClose();
    };
  };

  const handleChat = (id) => {
    console.log('Chat id:', id);
    navigate(`/sessions/${id}`);
  };

  return (
    <>
      {!isActivity ? (
        <Card {...chatHistoryStyles.cardContainer}>
          <Grid container alignItems={'center'} justifyContent={'center'}>
            <Grid item xs={4}>
              <img src={Images.HomeRex} alt="Clock" style={{ width: '80px' }} />
            </Grid>
            <Grid item xs={7} onClick={() => handleChat(id)}>
              <Grid>
                <Typography level="h4">ReX - {date}</Typography>
              </Grid>
              <Grid {...chatHistoryStyles.ellipsisText}>{lasttext}</Grid>
            </Grid>
            <Grid item xs={1}>
              {isEndedChat ? (
                <IconButton aria-label="delete" onClick={handleOpen}>
                  <DeleteIcon />
                </IconButton>
              ) : null}
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <DialogContent>
                  <Grid container {...chatStyles.dialogContainer}>
                    <Grid item xs={12}>
                      <img
                        src={Images.HomeRex}
                        style={{ width: '150px', padding: '12px' }}
                        alt="logo"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography level="h3">Delete Chat?</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        style={{ margin: '12px 24px' }}
                        align="center"
                      >
                        Are you sure you want to delete this ended chat?
                      </Typography>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Grid container>
                    <Grid item {...chatStyles.dialogActions}>
                      <Button
                        {...homeStyles.confirmButton}
                        onClick={handleDelete(id)}
                      >
                        <Typography {...homeStyles.confirmButtonText}>
                          Yes, End Session
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid item {...chatStyles.dialogActions}>
                      <Button
                        {...homeStyles.cancelButton}
                        onClick={handleClose}
                      >
                        <Typography {...homeStyles.cancelButtonText}>
                          Cancel
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </DialogActions>
              </BootstrapDialog>
            </Grid>
          </Grid>
        </Card>
      ) : (
        <Card {...chatHistoryStyles.cardContainer}>
          <Grid container>
            <Grid item xs={2}>
              <img
                src={Images.ClockIcon}
                alt="Clock"
                style={{ width: '48px' }}
              />
            </Grid>
            <Grid item xs={10}>
              <Grid>
                <Typography level="h4">ReX - {date}</Typography>
              </Grid>
              <Grid>
                {chatsLength > 1
                  ? `${chatsLength} Messages`
                  : `${chatsLength} Message`}
              </Grid>
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
};

export default ChatHistory;
