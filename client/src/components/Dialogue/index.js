import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialogue({ open, handleCloseDialogue, dialogueBody, yes, no }) {
    const handleClose = () => {
        handleCloseDialogue()
    };

    return (
        <div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{dialogueBody?.title}</DialogTitle>
                <DialogContent>
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
