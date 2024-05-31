const chatStyles = {
  textDisplayBackground: {
    padding: '0 24px 24px 24px',
    overflowy: 'auto',
  },
  inputContainer: {
    position: 'fixed', // Add this line
    bottom: 0, // Add this line
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 0 24px 0',
    spacing: 2,
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
  dialogContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  dialogActions: {
    padding: '16px 0',
    margin: '0 auto',
  },
};

export default chatStyles;
