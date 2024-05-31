import React, { useEffect, useState } from 'react';
import ChatHistory from '../../components/ChatHistory';
import { Button, Grid, Typography } from '@mui/material';
import api from '../../api/sessions';
import NavBar from '../../components/Navigation';
import activityStyles from '../../styles/activity';
import { BarChart } from '@mui/x-charts/BarChart';
import { useNavigate } from 'react-router-dom';

const Activity = () => {
  const [sessions, setSessions] = useState([]);
  const [sessionDates, setSessionDates] = useState([]);
  const [sessionChatLengths, setSessionChatLengths] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get('/sessions');

        const sessions = response.data.reverse();
        const sessionDates = sessions.map((data) => data.date.split(',')[0]);
        const sessionChatLengths = sessions.map((data) => data.chats.length);

        setSessions(sessions);
        setSessionDates(sessionDates);
        setSessionChatLengths(sessionChatLengths);
      } catch (err) {
        console.error('An error occurred:', err);
      }
    };

    fetchSessions();
  }, []);

  const handleChat = (id) => {
    navigate(`/sessions/${id}`);
  };

  const handleEndedChat = () => {
    navigate('/endedChats');
  };

  return (
    <>
      <NavBar />

      <Grid container>
        <Grid item xs={12}>
          <Grid container {...activityStyles.historyContainer}>
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight={'700'}>
                Your Statistics
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ margin: '12px 0' }}>
                Graph of the time you spent with ReX this week.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <BarChart
                xAxis={[{ scaleType: 'band', data: [...sessionDates] }]}
                series={[{ data: [...sessionChatLengths] }]}
                width={380}
                height={300}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container {...activityStyles.activityText}>
            <Grid item>
              <Typography variant="h5" fontWeight={'700'}>
                Details Chat Activity
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
            {sessions.slice(0, 3).map((session) => (
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
                  isActivity={true}
                  chatsLength={session.chats.length}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Activity;
