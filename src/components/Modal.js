import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalDialog(props) {

    return (
        <div>
            <Dialog
                open={props.show}
                onClose={props.handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={props.fullWidth}
            >
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    {props.children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleCancel} color="primary">
                        {props.cancelText}
                    </Button>
                    {props.handleConfirm ?
                        <Button onClick={props.handleConfirm} color="primary" autoFocus>
                            {props.confirmText}
                        </Button>
                        :
                        null
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}
