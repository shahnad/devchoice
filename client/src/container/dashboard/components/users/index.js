import React, { useEffect } from 'react';
import {
    makeStyles, Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    fade,
    InputBase,
    Button,
    Box,
    IconButton,
    Typography,
    Avatar,
    Backdrop,
    CircularProgress
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteDialog from '../../../../components/DeleteDialogueBox';


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 200,
        [theme.breakpoints.up('sm')]: {
            marginTop: 30
        }
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 25
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        border: '1px solid #b615157a'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    delete: {
        height: 'fit-content',
        margin: 0,
        padding: 0,
        '& .MuiIconButton-label': {
            '& .MuiSvgIcon-root': {
                fontSize: 23
            }
        }
    },
    add: {
        height: 'fit-content'
    },
    emptyarray: {
        // height:theme.spacing(30),
        padding: theme.spacing(4),
    }, noImage: {
        height: 'fit-content',
        width: 'fit-content',
        '& .MuiAvatar-img': {
            objectFit: 'contain'
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));



export default function UsersList(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(2);
    const [userList, setUserList] = React.useState([])
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [isOpenDeleteDialogue, setOpenDeleteDialogue] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false)
    const { actions } = props;

    const handleOpenDeleteDialogue = () => {
        setOpenDeleteDialogue(true);
    };

    const DeleteDialogueResponce = (response) => {
        setOpenDeleteDialogue(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    React.useEffect(() => {
        if (!userList.length) {
            actions.getUserList();
        }
        setUserList(props.users.userList)
    }, [userList.length, props.users.userList])

    return (
        <>
            <Paper className={classes.paper}>
                <Backdrop className={classes.backdrop} open={props.users.isLoading} >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <DeleteDialog
                    isOpenDeleteDialogue={isOpenDeleteDialogue}
                    DeleteDialogueResponce={DeleteDialogueResponce}
                />
                <Grid container >
                    <Grid item xs={12}>
                        <Box display="flex"
                            flexDirection="row"
                            justifyContent="space-between">
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                            <Button
                                variant="contained"
                                className={classes.add}
                                size="small"
                                color="primary">
                                Add</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer  >
                            <Table className={classes.table}
                                size="small"
                                aria-label="a dense table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Dessert (100g serving)</TableCell>
                                        <TableCell align="right">Calories</TableCell>
                                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userList.length > 0 &&
                                       userList.map((user) => (
                                            <TableRow key={user.name} hover>
                                                <TableCell component="th" scope="row">
                                                    {user.name}
                                                </TableCell>
                                                <TableCell align="right">{user.email}</TableCell>
                                                <TableCell align="right">{user.phone}</TableCell>
                                                <TableCell align="right">{user.website}</TableCell>
                                                <TableCell align="right">{user.company.name}</TableCell>
                                                <TableCell align="right">
                                                    <IconButton
                                                        className={classes.delete}
                                                        onClick={handleOpenDeleteDialogue}
                                                    >
                                                        <DeleteIcon color="inherit" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            <>
                                {userList.length == 0 &&
                                    !props.users.isLoading &&
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        alignItems="center"
                                        className={classes.emptyarray}
                                        justifyContent="center">
                                        <Avatar src="/no-data.png"
                                            variant="square"
                                            className={classes.noImage}
                                            alt="No Image" />
                                        <Typography variant="h6" color="primary" gutterBottom>
                                            No data found
                            </Typography>
                                    </Box>}
                                {!props.users.isLoading &&
                                    userList.length == 0 &&
                                    <TablePagination
                                        component="div"
                                        count={100}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        rowsPerPage={rowsPerPage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />}
                            </>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}
