import React from 'react';
import {
    withStyles,
    Badge,
    ListItem,
    Menu,
    MenuItem,
    ListItemText,
    IconButton,
    Link
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

const StyledMenu = withStyles((theme) => ({
    paper: {
        border: '1px solid #d3d4d5',
        minWidth: theme.spacing(70)
    },
}))((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
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
    },
}))(MenuItem);

export default function NotificationPopups(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { history } = props;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                aria-controls="customized-menu"
                aria-haspopup="true"
                onClick={handleClick}>
                <Badge
                    badgeContent={17}
                    color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {[1, 2, 3, 4].map((e) =>
                    <StyledMenuItem key={e}>
                         <ListItemIcon>
                            <IconButton
                                color="primary">
                                <NotificationsNoneIcon
                                    fontSize="small" />
                            </IconButton>
                        </ListItemIcon>
                        <ListItemText
                            primary={`This is a sample notification ${e}`}
                        />
                        <ListItemIcon>
                            <IconButton
                                color="primary">
                                <CloseIcon
                                    fontSize="small" />
                            </IconButton>
                        </ListItemIcon>
                    </StyledMenuItem>)}
                <ListItem
                    button={true}
                >
                    <Link
                        onClick={() => {
                            history.push('/dashboard/notifications');
                            handleClose()
                        }}
                        style={{ cursor: 'pointer' }}>
                        <ListItemText
                            primary={`More..`}
                        />
                    </Link>
                </ListItem>
            </StyledMenu>
        </div>
    );
}
