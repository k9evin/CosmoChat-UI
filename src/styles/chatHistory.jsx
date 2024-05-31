const chatHistoryStyles = {
  cardContainer: {
    sx: {
      '--Card-radius': '28px',
      '--Card-padding': '20px',
    },
  },
  ellipsisText: {
    sx: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: '2',
      WebkitBoxOrient: 'vertical',
    }
  }
};

export default chatHistoryStyles;
