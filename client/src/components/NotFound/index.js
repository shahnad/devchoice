import React from 'react';
import {
    Avatar,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    placeItems: 'center',
    height:'100vh'
    },
    image: {
        height: 'fit-content',
        width:'fit-content'
    }
});


export default function NoPageFound(props) {
    const classes = useStyles(props);
    return (
        <div className={classes.root}> 
            <Avatar src="/not-found.png"
                className={classes.image}
                alt="no page found"
                variant="square" />
       </div>
 );
}