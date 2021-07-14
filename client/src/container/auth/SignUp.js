import React from 'react';
import {
  makeStyles,
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Divider,
  Box
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    width: theme.spacing(60),
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    },
  },
  avatar: {
    margin: theme.spacing(1),
    width: 140,
    height: 25,
    marginLeft: -13,
    marginBottom: -8,
    '& .MuiAvatar-img': {
      objectFit: 'contain'
    }
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    "& .MuiTextField-root": {
      "& .MuiFormHelperText-root": {
        position: 'absolute',
        bottom: -20
      }
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
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

export default function SignUp(props) {
  const classes = useStyles();
  const { history } = props;

  return (
    <>
      <div className={classes.paper}>
        <Avatar
          variant="square"
          alt="logo"
          src="https://www.zappfresh.com/images/self/zappfresh-logo.png"
          className={classes.avatar}
        />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                margin="dense"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I accept trems and conditions."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                onClick={() => history.push('/auth/login')}
                style={{cursor:'pointer'}}
                variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </>
  )
}