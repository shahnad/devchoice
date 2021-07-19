import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,

    '& .MuiListItem-root': {
      cursor: 'pointer',
      paddingTop:0,
      paddingBottom:0,
      '&:hover': {
        backgroundColor: '#bfbfbf1f'
      }
    }
  },
  grid: {
    height: theme.spacing(55),
    overflow: 'auto',
    '& .MuiGrid-item':{
      padding:'4px 12px'
    }
  }
}));

export default function EmployeeList({ employees, selectEmployeeList }) {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.grid}>
      {employees.employeeList.map(emp =>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <List className={classes.root} >
            <ListItem hover onClick={() => selectEmployeeList(emp)}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={emp.name} secondary={emp.department} />
            </ListItem>
          </List>
        </Grid>)}

    </Grid>

  );
}

