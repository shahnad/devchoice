import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        margin:'auto',
        backgroundColor: theme.palette.background.paper,
        '& .MuiListItem-root': {
            '&:hover': {
                backgroundColor: '#bfbfbf1f'
            }
        }
    },
    icon: {
        color: 'red',
        fontSize: 23,
        cursor: 'pointer',
    },
    
}));

export default function SelectedDetails({ employees, removeEmployeeFromSelected }) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {employees.selectedList.map(emp =>
                <ListItem hover>
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={emp.name} secondary={emp.department} />
                    <HighlightOffIcon className={classes.icon} onClick={()=>removeEmployeeFromSelected(emp)} />
                </ListItem>)}
        </List>
    );
}
