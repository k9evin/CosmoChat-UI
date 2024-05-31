import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import Images from '../../constants/images';
import chatStyles from '../../styles/chat';
import RexMessage from '../../components/RexMessage';
import api from '../../api/sessions';
import { OpenAI } from 'openai';
import { useParams } from 'react-router-dom';
import UserMessage from '../../components/UserMessage';
import useMediaQuery from '@mui/material/useMediaQuery';
import NavBar from '../../components/Navigation';

const Chat = () => {
  const { id } = useParams();
  const [userPrompt, setUserPrompt] = useState('');
  const [sessions, setSessions] = useState([]);
  const [thisSession, setThisSession] = useState({});
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
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });
  const matches = useMediaQuery('(min-width: 600px)');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get('/sessions');
        console.log(response.data);
        setSessions(response.data);
        setThisSession(
          response.data.find(
            (session) => parseInt(session?.id, 10) === parseInt(id, 10)
          )
        );
      } catch (err) {
        console.error('An error occurred:', err);
      }
    };

    fetchSessions();
  }, [id]);

  const formatDate = (date) => {
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = new Date();
    const formattedDate = formatDate(date);

    // Push userPrompt to the database first
    const userChat = { user: userPrompt };
    thisSession.chats.push(userChat);

    const userSession = {
      id: id,
      date: formattedDate,
      chats: thisSession.chats,
      isSessionEnded: thisSession.isSessionEnded,
    };

    let response = await api.put(`/sessions/${id}`, userSession);
    setSessions(
      sessions.map((session) => (session.id === id ? response.data : session))
    );

    try {
      const reXReply = await callOpenAIAPI();

      thisSession.chats[thisSession.chats.length - 1].ReX = reXReply;

      const updatedSession = {
        id: id,
        date: formattedDate,
        chats: thisSession.chats,
        isSessionEnded: thisSession.isSessionEnded,
      };

      response = await api.put(`/sessions/${id}`, updatedSession);
      setSessions(
        sessions.map((session) => (session.id === id ? response.data : session))
      );
      setUserPrompt('');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  async function callOpenAIAPI() {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content:
              'Your name is ReX. You are a career advice assistant. You give advice to Andrew about his career as reply to his prompt. Limit your response to 100 words. You remember the previous conversations and details given by the user.',
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        model: 'gpt-3.5-turbo',
        max_tokens: 100,
      });

      if (completion) {
        console.log(completion);
        return completion.choices[0].message.content;
      } else {
        console.error('Unexpected response format from OpenAI API.');
        return null;
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      return null;
    }
  }

  return (
    <>
      <NavBar sessionId={id} />

      <Grid container style={{ display: matches ? 'none' : 'block' }}>
        <Grid style={{ padding: '24px', position: 'sticky' }}>
          <img src={Images.HomeRex} alt="ReX" style={{ width: '105px' }} />
        </Grid>
        <Grid {...chatStyles.textDisplayBackground}>
          <Grid {...chatStyles.parentContainer}>
            {thisSession?.chats?.length
              ? thisSession?.chats?.map((chat, i) =>
                  Object.keys(chat).map((key) =>
                    key === 'ReX' ? (
                      <RexMessage rexMessage={chat.ReX} key={'rex' + i} />
                    ) : (
                      <UserMessage userMessage={chat.user} key={'user' + i} />
                    )
                  )
                )
              : null}
          </Grid>
          {thisSession && !thisSession.isSessionEnded ? (
            <Grid container {...chatStyles.inputContainer}>
              <Grid item xs={8}>
                <Textarea
                  placeholder="Type a message to ReX ..."
                  variant="plain"
                  color="plain"
                  size="lg"
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <Button onClick={handleSubmit} variant="contained">
                  Send
                </Button>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
