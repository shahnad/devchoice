import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles, Snackbar } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Snackbars(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const snack = useSelector(state => state?.notification);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ type: 'CLOSE_NOTIFICATION' })
  };

  return (
    <div className={classes.root}>
      <Snackbar open={snack?.isOpen}
        autoHideDuration={4000}
        onClose={handleClose}>
        <Alert onClose={handleClose}
          severity={snack?.snackMessage?.severity}>
          {snack?.snackMessage?.message}
        </Alert>
      </Snackbar>

    </div>
  );
}
