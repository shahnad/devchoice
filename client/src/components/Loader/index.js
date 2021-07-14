import React from 'react';
import { makeStyles,Backdrop,
CircularProgress } from '@material-ui/core';
import './Loader.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    '& > * + *': {
            marginLeft: theme.spacing(2),
        },
            width: '100vw',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            zIndex: 1,
    
    },
     backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

export default function Loader(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className="loader">Loading...</div>
        </div>
    );
}
