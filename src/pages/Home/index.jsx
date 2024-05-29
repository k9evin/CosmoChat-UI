import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import Images from '../../constants/images';
import AllStyles from '../../styles/home';
import api from '../../api/sessions';
import { useNavigate } from 'react-router';
import useMediaQuery from '@mui/material/useMediaQuery';

function Home() {
  const [sessions, setSessions] = useState([]);
  const navigator = useNavigate();
  const matches = useMediaQuery('(min-width:600px)');
  const [loading, setLoading] = useState(true);
  const rexIntroduction = "Hello, I am ReX. 😁, What aspect of your career would you like guidance on?"
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const formatDate = (date) => {
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchSessions = async () => {
      try {
        const response = await api.get('/sessions', {
          signal: controller.signal,
        });
        setSessions(response.data.reverse());
        setLoading(false);
      } catch (err) {
        console.error('Fetch sessions error:', err);
      }
      return () => controller?.abort();
    };
    fetchSessions();
  }, []);

  const handleSubmit = async () => {
    const nextSessionId = sessions.length
      ? (parseInt(sessions[0].id) + 1).toString()
      : '1';
    const date = new Date();
    const formattedDate = formatDate(date);

    const newSession = {
      id: nextSessionId,
      date: formattedDate,
      chats: [{ ReX: rexIntroduction }],
      isSessionEnded: false,
    };

    try {
      if (parseInt(nextSessionId) > 1) {
        const lastSessionId = (parseInt(nextSessionId) - 1).toString();
        const activeSession = sessions.find(
          (session) => session.id === lastSessionId
        );
        if (activeSession) {
          activeSession.isSessionEnded = true;
          await api.patch(`/sessions/${lastSessionId}`, activeSession);
          setSessions(
            sessions.map((session) =>
              session.id === lastSessionId ? activeSession : session
            )
          );
        }
      }
      const response = await api.post('/sessions', newSession);
      setSessions([...sessions, response.data]);
      navigator(`/sessions/${nextSessionId}`);
    } catch (err) {
      console.error('Submit session error:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/sessions/${id}`);
      setSessions(sessions.filter((session) => session.id !== id));
    } catch (err) {
      console.error('Delete session error:', err);
    }
  };

  return (
    <Grid container style={{ display: matches ? 'none' : 'block' }}>
      {loading ? (
        <CircularProgress
          sx={{
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ) : (
        <Grid item {...AllStyles.homeBody}>
          <Grid {...AllStyles.homeRex}>
            <img src={Images.HomeRex} alt="homeRex" />
          </Grid>
          <Grid className="greetings">
            <Typography {...AllStyles.greetings}>
              Welcome, Andrew! 👋
            </Typography>
          </Grid>
          <Grid>
            <Typography {...AllStyles.message}>
              Receive Career Help From ReX!
            </Typography>
          </Grid>
          <Grid>
            <Typography {...AllStyles.message2}>
              Start a conversation with ReX right now!
            </Typography>
          </Grid>
          <Grid style={{ textAlign: 'center' }}>
            <Button {...AllStyles.startChatButton} onClick={handleSubmit}>
              <Typography {...AllStyles.startChatButtonText}>
                Start Chat With ReX
              </Typography>
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default Home;
