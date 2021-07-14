import React, { useState, useEffect } from 'react';
import { ListItem, Collapse, List, makeStyles, MenuList } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import StoreIcon from '@material-ui/icons/Store';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CategoryIcon from '@material-ui/icons/Category';
import ListIcon from '@material-ui/icons/List';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ReorderIcon from '@material-ui/icons/Reorder';


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
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="Hubs" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}
            onClick={() => SelectPath('/dashboard/hubs')}>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary="Hub list" />
          </ListItem>
          <ListItem button className={classes.nested}
            onClick={() => SelectPath('/dashboard/users')}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Users list" />
          </ListItem>
          <ListItem button className={classes.nested}
            onClick={() => SelectPath('/dashboard/orders')}>
            <ListItemIcon>
              <ReorderIcon />
            </ListItemIcon>
            <ListItemText primary="Order list" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Admin" />
      </ListItem>
     </div>
  )
}
export default MainListItems;