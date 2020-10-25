import React, { useState, useEffect, useCallback } from 'react'
import axios from '../axios/axios-default'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Button from '@material-ui/core/Button';
import AddUser from './schedule/AddUser'
import Modal from '../components/Modal'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const Schedule = props => {
    const classes = useStyles();

    const [schedule, setSchedule] = useState(null)
    const [day, setDay] = useState(1)
    const [addUserModal, setAddUserModal] = useState(false)
    const [confirmModal, setConfirmModal] = useState({ show: false, handleConfirm: () => { } })
    const [selectedUserId, setSelectedUserId] = useState(null)

    const loadAvailableUser = useCallback(() => {
        axios.get(`/schedule/${day}`).then(res => {
            setSchedule(res.data)
        })
    }, [day])

    useEffect(() => {
        loadAvailableUser()
    }, [loadAvailableUser])

    const changeDay = (day) => {
        setDay(day)
    }
    const closeConfirmModal = () => {
        setConfirmModal(() => ({
            ...confirmModal, show: false
        }))
    }
    // const openConfirmModal = () => {
    //     setConfirmModal(() => ({
    //         ...confirmModal, show:true
    //     }))
    // }
    const openRemoveUserModal = (userId) => {
        setSelectedUserId(userId)
        setConfirmModal(() => ({
            show: true, handleConfirm: handleRemoveUser
        }))
    }
    const openAddUser = () => {
        setAddUserModal(true)
        // setConfirmModal(() => ({
        //     ...confirmModal, handleConfirm: handleAddUser
        // }))
    }
    const closeAddUser = () => {
        setAddUserModal(false)
    }

    const handleAddUser = (userId, dayId) => {
        axios.post('/schedule', { user_id: userId, day_id: dayId }).then(res => {
            loadAvailableUser()
            setAddUserModal(false)
            // setConfirmModal(() => ({
            //     ...confirmModal, show: false
            // }))
        })
    }
    const handleRemoveUser = () => {
        axios.delete(`/schedule/${selectedUserId}/${day}`).then(res => {
            loadAvailableUser()
            setConfirmModal(() => ({
                ...confirmModal, show: false
            }))
        })
    }

    if (!schedule) return <p>Loading....</p>
    return (
        <div>
            <AddUser show={addUserModal} handleClose={closeAddUser} day={day} onAddUser={handleAddUser} />
            <Modal show={confirmModal.show} confirmText={'yes'} cancelText={'no'} title={'Confirmation'} handleCancel={closeConfirmModal} handleConfirm={handleRemoveUser} fullWidth>
                <p>Are you sure ? </p>
            </Modal>

            <div style={{ textAlign: 'center' }}>
                <Button size="small" onClick={() => changeDay(1)}>Mon</Button>
                <Button size="small" onClick={() => changeDay(2)}>Tue</Button>
                <Button size="small" onClick={() => changeDay(3)}>Wed</Button>
                <Button size="small" onClick={() => changeDay(4)}>Thu</Button>
                <Button size="small" onClick={() => changeDay(5)}>Fri</Button>
                <Button size="small" onClick={() => changeDay(6)}>Sat</Button>
                <Button size="small" onClick={() => changeDay(0)}>Sun</Button>
            </div>
            <div style={{ textAlign: 'center' }}>
                <h5>{schedule.name} <span><IconButton size="small" onClick={openAddUser} ><AddCircleOutlineIcon/></IconButton></span> </h5>
                
            </div>
            {schedule.schedule.map(sch => {
                return (
                    <List key={sch.id} className={classes.root}>
                        <ListItem role={undefined} dense button >
                            <ListItemText primary={sch.name.split(' ').map(name => name[0].toUpperCase() + name.slice(1) + ' ')} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => openRemoveUserModal(sch.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                )
            })}

        </div>
    )
}

export default Schedule