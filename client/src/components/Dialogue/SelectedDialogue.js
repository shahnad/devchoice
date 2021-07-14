import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
         width: 'max-content'
    },
    dialogue: {
        '& .MuiDialog-container': {
            '& .MuiPaper-root': {
                minWidth: theme.spacing(70),
                '& .MuiDialogContent-root': {
                    '& textarea': {
                        maxWidth: '100%',
                        minWidth: '100%',
                        minHeight: theme.spacing(20),
                        outline: 0
                    }
                }
            }
        }
    }
}))

export default function SelectPersonDialogue({
    open,
    handleCloseDialogue,
    dialogueBody,
    yes,
    no }) {

    const classes = useStyles();

    const handleClose = () => {
        handleCloseDialogue()
    };

    return (
        <div className={classes.root}>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={classes.dialogue}>
                <DialogTitle id="alert-dialog-title">{dialogueBody?.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogueBody?.description}
                    </DialogContentText>
                    <TextareaAutosize aria-label="minimum height" minRows={3} placeholder={dialogueBody?.description} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={no} color="secondary" variant="contained" size="small">
                        {dialogueBody?.cancelLabel}
                    </Button>
                    <Button onClick={yes} color="primary" variant="contained" size="small">
                        {dialogueBody?.okLabel}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
