import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
         width: 'max-content'
    },
    dialogue: {
        '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              '& .MuiDialogContent-root': {
                   display:'flex',
                   paddingTop:theme.spacing(1),
                   paddingBottom:theme.spacing(1),
                   '& .MuiSvgIcon-root':{
                       width:theme.spacing(10),
                       height:theme.spacing(10),
                   }
                },
                '& .MuiDialogContentText-root':{
                    margin:theme.spacing('auto',5),
                }
            }
        }
    }
}))


export default function AlertDialogue({ open, handleCloseDialogue, dialogueBody, yes, no }) {
    const classes = useStyles();
    const handleClose = () => {
        handleCloseDialogue()
    };

    return (
        <div>

            <Dialog
                open={open}
                className={classes.dialogue}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{dialogueBody?.title}</DialogTitle>
                <DialogContent>
                    <WarningIcon color="primary" />
                    <DialogContentText id="alert-dialog-description">
                        {dialogueBody?.description}
                    </DialogContentText>
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
