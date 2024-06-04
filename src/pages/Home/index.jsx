import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import Images from '../../constants/images';
import homeStyles from '../../styles/home';
import api from '../../api/sessions';
import useMediaQuery from '@mui/material/useMediaQuery';
import NavBar from '../../components/Navigation';
import ChatHistory from '../../components/ChatHistory';
import { useNavigate } from 'react-router-dom';
import activityStyles from '../../styles/activity';

function Home() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:600px)');
  const [loading, setLoading] = useState(true);
  const rexIntroduction =
    'Hello, I am ReX. 😁, What aspect of your career would you like guidance on?';
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
    const fetchSessions = async () => {
      try {
        const response = await api.get('/sessions');
        setSessions(response.data.reverse());
        setLoading(false);
      } catch (err) {
        console.error('Fetch sessions error:', err);
      }
    };
    fetchSessions();
  }, []);

  const handleEndedChat = () => {
    navigate('/endedChats');
  };

  const handleChat = (id) => {
    navigate(`/sessions/${id}`);
  };

  const handleNewChat = async () => {
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
      navigate(`/sessions/${nextSessionId}`);
    } catch (err) {
      console.error('Submit session error:', err);
    }
  };

  return (
    <>
      <NavBar />
      {sessions.length > 0 ? (
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h5" fontWeight={'700'} style={{ margin: '12px 24px' }}>
                  Active Chats
                </Typography>
              </Grid>
              <Grid container gap={3}>
                {sessions
                  .filter((session) => !session.isSessionEnded)
                  .map((session) => (
                    <Grid
                      item
                      xs={12}
                      key={session.id}
                      {...activityStyles.historyContainer}
                      onClick={() => handleChat(session.id)}
                    >
                      <ChatHistory
                        id={session.id}
                        date={session.date}
                        lasttext={session.chats[session.chats.length - 1].ReX}
                        sessionEnded={session.isSessionEnded}
                        isActivity={false}
                        isEndedChat={false}
                        chatsLength={session.chats.length}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container {...activityStyles.activityText}>
              <Grid item>
                <Typography variant="h5" fontWeight={'700'}>
                  Ended Chats
                </Typography>
              </Grid>
              <Grid item>
                <Button onClick={handleEndedChat}>
                  <Typography fontWeight={'600'} color={'#6949FF'}>
                    See all
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid container gap={3}>
              {sessions
                .filter((session) => session.isSessionEnded)
                .slice(0, 3)
                .map((session) => (
                  <Grid
                    item
                    xs={12}
                    key={session.id}
                    {...activityStyles.historyContainer}
                    onClick={() => handleChat(session.id)}
                  >
                    <ChatHistory
                      id={session.id}
                      date={session.date}
                      lasttext={session.chats[session.chats.length - 1].ReX}
                      sessionEnded={session.isSessionEnded}
                      isActivity={false}
                      isEndedChat={false}
                      chatsLength={session.chats.length}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            sx={{ padding: '24px' }}
          >
            <Button {...homeStyles.confirmButton} onClick={handleNewChat}>
              <Typography {...homeStyles.confirmButtonText}>
                Start Another Chat With ReX
              </Typography>
            </Button>
          </Grid>
        </Grid>
      ) : (
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
            <Grid item {...homeStyles.homeBody}>
              <Grid {...homeStyles.homeRex}>
                <img src={Images.HomeRex} alt="homeRex" />
              </Grid>
              <Grid className="greetings">
                <Typography {...homeStyles.greetings}>
                  Welcome, Andrew! 👋
                </Typography>
              </Grid>
              <Grid>
                <Typography {...homeStyles.message}>
                  Receive Career Help From ReX!
                </Typography>
              </Grid>
              <Grid>
                <Typography {...homeStyles.message2}>
                  Start a conversation with ReX right now!
                </Typography>
              </Grid>
              <Grid style={{ textAlign: 'center' }}>
                <Button {...homeStyles.confirmButton} onClick={handleNewChat}>
                  <Typography {...homeStyles.confirmButtonText}>
                    Start Chat With ReX
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
}

export default Home;
