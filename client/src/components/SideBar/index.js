import React, { useState, useEffect } from 'react';
import { ListItem, Collapse, List, makeStyles, MenuList } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';



const useStyles = makeStyles((theme) => ({
 
  nested: {
    paddingLeft: theme.spacing(4),
  },
  list: {
     '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
            '& .MuiListItemIcon-root': {
                '& .MuiIconButton-root': {
                    color: theme.palette.common.white,
                }
            }
        },
  }
}));


const MainListItems = (props) => {
  const classes = useStyles();
  const [menu, setMenu] = useState([])
  const [open, setOpen] = React.useState(false);


  useEffect(() => {
    if (menu.length == 0) {

      setMenu(MenuList)
    }
  }, [menu])


  const SelectPath = (path) => {
    props.history.push(path)
  }
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.list}>
      <ListItem button  
        onClick={() => SelectPath('/dashboard')} >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button  
        onClick={() => SelectPath('/dashboard/nominations')} >
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary="Nomination List" />
      </ListItem>
     
     </div>
  )
}
export default MainListItems;