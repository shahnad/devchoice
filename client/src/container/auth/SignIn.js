import React from 'react';
import {
  makeStyles,
  TextField,
  CircularProgress,
  Link,
  Grid,
  Typography,
  Avatar,
  Button,
  Divider,
  Box
} from '@material-ui/core';
import { useGoogleLogin } from 'react-google-login';
import { refreshToken } from '../../utils/refreshToken';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { CloseNotification, OpenNotification } from '../../redux/action/NotifyAction';


const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(20, 'auto'),
    display: 'flex',
    flexDirection: 'column',
    width: theme.spacing(40),
    [theme.breakpoints.down('xs')]: {
      width: '80%'
    },
  },
  avatar: {
    margin: theme.spacing(1, 'auto'),
    width: 140,
    height: 40,

    '& .MuiAvatar-img': {
      objectFit: 'contain'
    }
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    "& .MuiTextField-root": {
      "& .MuiFormHelperText-root": {
        position: 'absolute',
        bottom: -20
      }
    },
    '& .MuiTypography-h6': {
      textAlign: 'center'
    }
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  textfield: {
    margin: '10px auto',

  },
  wrapper: {
    margin: '14px auto',
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  copyright: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    height: '10%'
  }
}));

function Copyright() {
  return (
    <>
      <Divider />
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </>
  );
}

export default function SignIn(props) {

  const classes = useStyles();
  const { actions, userdata, history } = props
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const dispatch = useDispatch()
  const [userEmail, setUserEmail] = React.useState("");

  const { state: { toLocation = "/dashboard" } = {} } = useLocation();

  const onSuccess = (res) => {

    const email = res.profileObj.email;
    const image = res.profileObj.imageUrl;
    setUserEmail(email);
    window.localStorage.setItem("loginEmail", email);
    window.localStorage.setItem("userImage", image);
    refreshToken(res);
    dispatch(OpenNotification({
      isOpen: true,
      snackMessage: {
        message: 'Logged in Successfully',
        severity: 'success'
      }
    }))
actions.UserLogin(res)
    history.push('/dashboard')

    dispatch(CloseNotification())
  }
  const onFailure = (res) => {
    dispatch(OpenNotification({
      isOpen: true,
      snackMessage: {
        message: 'Something went wrong',
        severity: 'error'
      }
    }))
  };


  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
  })

  return (
    <>
      <div className={classes.paper}>
        <Avatar
          variant="square"
          alt="logo"
          src="../logo-google.png"
          className={classes.avatar}
        />
        <form className={classes.form} noValidate>
          <Typography component="h1" variant="h6">
            Sign in using your google account
          </Typography>
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              onClick={signIn}
              className={classes.submit}
              disabled={loading}
            >
              Sign In
            </Button>
            {loading && <CircularProgress size={24} color="primary" className={classes.buttonProgress} />}
          </div>
        </form>
      </div>
      <Box className={classes.copyright}>
        <Copyright />
      </Box>
    </>

  );
}
