import React, { useState, useEffect, useCallback } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add'
import axios from '../../axios/axios-default'


export default function AddUserModal(props) {

    const [name, setName] = useState('')
    const [users, setUsers] = useState([])

    const loadAvailableUsers = useCallback(() => {
        axios.get(`/schedule/user/search/${props.day}?key=${name.toLowerCase()}`).then(res => {
            setUsers(res.data)
        })
    }, [name, props.day, props.show])

    useEffect(() => {
        loadAvailableUsers()
    }, [loadAvailableUsers])

    useEffect(() => {
        setName('')
    }, [props.show])

    const handleFormChange = (e) => {
        setTimeout(() => {
            setName(e.target.value)
        }, 500)
    }

    return (
        <div>
            <Dialog open={props.show} onClose={props.handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Add User to Schedule</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText> */}
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        onChange={handleFormChange}
                    />

                    <div>
                        <List >
                            {users.map(user => {
                                return (
                                    <ListItem key={user.id} role={undefined} dense button >
                                        <ListItemText primary={user.name.split(' ').map(name => name[0].toUpperCase() + name.slice(1) + ' ')} />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="add" onClick={() => props.onAddUser(user.id, props.day)}>
                                                <AddIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    )
}