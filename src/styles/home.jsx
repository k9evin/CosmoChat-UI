const homeStyles = {
  homeBody: {
    sx: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      paddingTop: '50px',
      width: '90%',
      margin: '0 auto',
    },
  },
  homeRex: {
    sx: {
      zIndex: 100,
      padding: '100px 0',
    },
  },
  greetings: {
    sx: {
      display: 'flex',
      color: 'var(--Greyscale-900, #212121)',
      fontSize: '32px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '120%',
      margin: '50px 0',
    },
  },
  message: {
    sx: {
      color: 'var(--Greyscale-900, #212121)',
      textAlign: 'center',
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: 1000,
      lineHeight: '120%',
      margin: '0 0 15px 0',
    },
  },
  message2: {
    sx: {
      color: 'var(--Greyscale-900, #212121)',
      textAlign: 'center',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '140%',
      letterSpacing: '0.2px',
      margin: '0 0 32px 0',
    },
  },
  confirmButton: {
    sx: {
      display: 'flex',
      padding: '20px 16px',
      borderRadius: '100px',
      background: 'var(--Primary-500, #6949FF)',
      height: '58px',
      ':hover': {
        textDecoration: 'none',
      },
      width: '300px',
    },
  },
  cancelButton: {
    sx: {
      display: 'flex',
      padding: '20px 16px',
      borderRadius: '100px',
      background: 'var(--Primary-100, #F0EDFF)',
      height: '58px',
      ':hover': {
        textDecoration: 'none',
      },
      width: '300px',
    },
  },
  confirmButtonText: {
    sx: {
      width: '100%',
      color: 'var(--Others-White, #FFF)',
      textShadow: '4px 8px 24px rgba(0, 205, 189, 0.25)',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '140%',
      letterSpacing: '0.2px',
      textTransform: 'capitalize',
    },
  },
  cancelButtonText: {
    sx: {
      width: '100%',
      color: 'var(--Others-White, #6949FF)',
      textShadow: '4px 8px 24px rgba(0, 205, 189, 0.25)',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '140%',
      letterSpacing: '0.2px',
      textTransform: 'capitalize',
    },
  },
};

export default homeStyles;
