import React from 'react';
import {
  makeStyles,
  ListItemIcon,
  IconButton,
  Tooltip, List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function MoreNotifications(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => <div key={e}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Ali Connors
              </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
          <ListItemIcon >
            <Tooltip title="Remove">
              <IconButton color="inherit">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ListItemIcon>

        </ListItem>
        <Divider variant="inset" component="li" />
      </div>)}
    </List>
  );
}
