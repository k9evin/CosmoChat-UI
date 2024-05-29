const ChatStyles = {
  textDisplayBackground: {
    padding: '0 24px 24px 24px',
    height: 'calc(100vh - 120px)',
    overflowy: 'auto',
  },
  inputContainer: {
    alignItems: 'center',
    padding: '0 0 16px 0',
  },
  endedChatContainer: {
    backgroundColor: '#f5f5f5',
    padding: '16px',
    borderRadius: '8px',
    marginbottom: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  endedChatDateContainer: {
    flex: '0 0 auto',
    marginRight: '16px',
  },
  endedChatDate: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#666',
  },
  endedChatMessagesContainer: {
    flex: '1 1 auto',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },
  endedChatMessageContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    marginRight: '16px',
  },
  endedChatMessage: {
    padding: '8px 12px',
    borderRadius: '8px',
    marginRight: '8px',
  },
  endedChatUserMessage: {
    backgroundColor: '#e0e0e0',
    color: '#333',
  },
  endedChatRexMessage: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  endedChatButtonContainer: {
    flex: '0 0 auto',
  },
  endedChatButton: {
    backgroundColor: '#ff0000',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#cc0000',
    },
  },
  homeContainer: {
    padding: '40px',
    height: '100vh',
    overflowy: 'auto',
  },
  parentContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  rexMessageContainer: {
    width: '300px',
    marginBottom: '16px',
    backgroundColor: '#F3F3F3',
    padding: '16px 24px',
    borderRadius: '8px 20px 20px 20px',
    alignSelf: 'flex-start', 
  },
  rexMessageText: {
    fontSize: '18px',
    lineHeight: '1.5',
    color: '#212121',
  },
  userMessageContainer: {
    maxWidth: '300px',
    marginBottom: '16px',
    backgroundColor: '#6949FF',
    padding: '16px 24px',
    borderRadius: '20px 20px 8px 20px',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  userMessageText: {
    fontSize: '18px',
    lineHeight: '1.5',
    color: '#fff',
  },
};

export default ChatStyles;
