import React, { useEffect, useState } from 'react';
import api from '../../api/sessions';
import NavBar from '../../components/Navigation';
import { Grid } from '@mui/material';
import ChatHistory from '../../components/ChatHistory';
import activityStyles from '../../styles/activity';

const EndedChat = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get('/sessions');
        const sessions = response.data.reverse();
        setSessions(sessions);
      } catch (err) {
        console.error('An error occurred:', err);
      }
    };

    fetchSessions();
  }, []);

  return (
    <>
      <NavBar />
      <Grid container gap={3}>
        {sessions
          .filter((session) => session.isSessionEnded)
          .map((session) => (
            <Grid
              item
              xs={12}
              key={session.id}
              {...activityStyles.historyContainer}
            >
              <ChatHistory
                id={session.id}
                date={session.date}
                lasttext={session.chats[session.chats.length - 1].ReX}
                sessionEnded={session.isSessionEnded}
                isActivity={false}
                isEndedChat={true}
                chatsLength={session.chats.length}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default EndedChat;
