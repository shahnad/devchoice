import React from "react";
import { Button, Typography, makeStyles, Box, Card, CircularProgress } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const useStyles = makeStyles((theme) => ({
    title: {
        padding: 40
    },
    icon: {
        fontSize: theme.spacing(15),
        color: "#b61515",
        margin: "auto",
    },
    
    wrapper: {
        position: 'relative',
    },

    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },

}));

export default function DeleteDialog(props) {
    const classes = useStyles();
    const { isOpenDeleteDialogue, DeleteDialogueResponce } = props;
    const [loading, setLoading] = React.useState(false);
    const timer = React.useRef();
    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);
    const handleDelete = () => {
        if (!loading) {
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setLoading(false);
                DeleteDialogueResponce(false);
            }, 2000);
        }
    };

    const handleClose = () => {
        DeleteDialogueResponce(false);
    };

    return (
        <div>
            <Dialog
                open={isOpenDeleteDialogue}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Card className={classes.title}>
                    <Box display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center">
                        <ErrorOutlineIcon className={classes.icon} />
                        <Typography variant="h6" gutterBottom>
                            Are you sure?
               </Typography>
                    </Box>
                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-description">
                           are you sure you want to permanently delete this item ?
               </DialogContentText>
                    </DialogContent>
                    <Box display="flex"
                        alignItems="center"
                        justifyContent="space-evenly"
                        flexDirection="row">
                        <div className={classes.wrapper}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleDelete}
                                fullWidth
                                disabled={loading}
                            >Delete</Button>
                            {loading && <CircularProgress
                                size={24}
                                color="primary"
                                className={classes.buttonProgress}
                            />}
                        </div>
                        <Button
                            onClick={handleClose}
                            variant="contained"
                            color="inherit">
                            Cancel
                        </Button>
                    </Box>
                </Card>
            </Dialog>
        </div>
    );
}
