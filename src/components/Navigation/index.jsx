import { Grid } from '@mui/material';
import Images from '../../constants/images';
import React, { useEffect, useState } from 'react';
import navBarStyles from '../../styles/navBar';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import homeStyles from '../../styles/home';
import Button from '@mui/material/Button';
import chatStyles from '../../styles/chat';
import api from '../../api/sessions';

const NavBar = ({ sessionId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChat, setIsChat] = useState(false);
  const [isEndedChats, setIsEndedChats] = useState(false);
  const [isActvity, setIsActivity] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  useEffect(() => {
    if (location.pathname === '/') {
      setIsHome(true);
    } else if (location.pathname === '/endedChats') {
      setIsEndedChats(true);
    } else if (location.pathname === '/activity') {
      setIsActivity(true);
    } else {
      setIsChat(true);
    }
  }, [location]);

  const handleBack = () => {
    // navigate to the previous page
    navigate('/');
  };

  const handleEndChat = async () => {
    handleClose();

    // Call the sessions API
    await api.patch(`/sessions/${sessionId}`, {
      isSessionEnded: true,
    });

    window.location.reload();
  };

  const handleActivity = () => {
    navigate('/activity');
  };

  return (
    <Grid container {...navBarStyles.navBarContainer} justify="space-between">
      <Grid container item xs={6} {...navBarStyles.navigationLeft}>
        {isHome ? (
          <Grid item>
            <img src={Images.NavRex} alt="Logo" />
          </Grid>
        ) : (
          <Grid item>
            <img src={Images.BackArrow} alt="Back arrow" onClick={handleBack} />
          </Grid>
        )}
        {isHome ? (
          <Grid item>
            <Typography variant="h5" fontWeight={'700'}>
              ReX
            </Typography>
          </Grid>
        ) : isChat ? (
          <Grid item>
            <Typography variant="h5" fontWeight={'700'}>
              ReX
            </Typography>
          </Grid>
        ) : isEndedChats ? (
          <Grid item>
            <Typography variant="h5" fontWeight={'700'}>
              Ended Chats
            </Typography>
          </Grid>
        ) : isActvity ? (
          <Grid item>
            <Typography variant="h5" fontWeight={'700'}>
              Activity
            </Typography>
          </Grid>
        ) : null}
      </Grid>
      <Grid
        container
        item
        xs={6}
        {...navBarStyles.navigationRight}
        justify="flex-end"
      >
        {isHome && (
          <Grid item>
            <img
              src={Images.ActivityIcon}
              alt="Activity"
              onClick={handleActivity}
            />
          </Grid>
        )}
        {isChat && (
          <Grid item>
            <img src={Images.EndIcon} alt="End chat" onClick={handleOpen} />
          </Grid>
        )}
      </Grid>
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
              <Typography variant="h5" gutterBottom>
                End Session
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Are you sure you want to end this session?
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container>
            <Grid item {...chatStyles.dialogActions}>
              <Button {...homeStyles.confirmButton} onClick={handleEndChat}>
                <Typography {...homeStyles.confirmButtonText}>
                  Yes, End Session
                </Typography>
              </Button>
            </Grid>
            <Grid item {...chatStyles.dialogActions}>
              <Button {...homeStyles.cancelButton} onClick={handleClose}>
                <Typography {...homeStyles.cancelButtonText}>Cancel</Typography>
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </BootstrapDialog>
    </Grid>
  );
};

export default NavBar;
