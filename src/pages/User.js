import React, { useState, useEffect } from 'react';
import axios from '../axios/axios-default'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Modal from '../components/Modal'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '95%',
        },
    },
    table: {
        // minWidth: 650,
        width: '100%'
    },
}))

export default function DenseTable() {
    const classes = useStyles()
    // const [anchorMenu, setAnchorMenu] = useState(null)
    const [users, setUsers] = useState([])
    const [form, setForm] = useState({ username: '', name: '', password:'' })
    const [modal, setModal] = useState({ show: false, title: 'Add User', confirmText: 'Add' })
    const [selectedUser, setSelectedUser] = useState('')
    const [error, setError] = useState(null)
    const [mode, setMode] = useState('add')
    const [checkPassword, setCheckPassword] = useState(false)

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = () => {
        axios.get('/user').then(res => {
            setUsers(res.data)
        })
    }

    // const openMenu = (e) => {
    //     setAnchorMenu(e.currentTarget)
    // }
    // const closeMenu = () => {
    //     setAnchorMenu(null)
    // }
    const closeModal = () => {
        setModal(() => ({
            ...modal, show: false, confirmHandler: null
        }))
        setForm({username: '', name: '',password:'' })
        setCheckPassword(false)
    }

    const openAddUserModal = () => {
        setMode('add')
        setForm({...form, username: '', name: '' })
        setModal(() => ({
            show: true, title: 'Add User', confirmText: 'Add'
        }))
    }
    const openEditUserModal = (user) => {
        setMode('edit')
        setSelectedUser(user.id)
        setForm({ ...form, username: user.username, name: user.name })
        setModal(() => ({
            show: true, title: 'Edit User', confirmText: 'Save'
        }))
    }
    const openDeleteUserModal = (userId) => {
        setMode('delete')
        setSelectedUser(userId)
        setModal(() => ({
            show: true, title: 'Delete User', confirmText: 'Yes'
        }))
    }

    const addUser = () => {
        axios.post('/user', form).then(res => {
            loadUsers()
            setModal(() => ({ ...modal, show: false }))
            setForm({...form, username: '', name: '' })
        })
    }
    const editUser = () => {
        const data = {
            user_id: selectedUser,
            update: form
        }
        axios.patch('/user', data).then(res => {
            loadUsers()
            setModal(() => ({ ...modal, show: false }))
        })
    }
    const deleteUser = () => {
        axios.delete(`/user/${selectedUser}`).then(res => {
            loadUsers()
            setModal(() => ({ ...modal, show: false }))
        })
    }

    const handleFormChanges = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setForm(() => ({
            ...form, [name]: value
        }))
    }

    const proceedModal = () => {
        if (mode === 'add') {
            return addUser()
        } else if (mode === 'edit') {
            return editUser()
        } else if (mode === 'delete') {
            return deleteUser()
        }
    }

    const changeCheckPassword = () => {
        setCheckPassword(() => !checkPassword)
    }

    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <h4>User List</h4>
            </div>
            <Button onClick={openAddUserModal} color="primary" variant="contained" style={{ margin: '1%' }}>Add User</Button>
            <TableContainer component={Paper} style={{ marginTop: '5%' }}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        {}
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, i) => {
                            return (
                                <TableRow key={user.id}>

                                    <TableCell align="center">{i + 1}</TableCell>
                                    <TableCell align="left">
                                        {user.name.split(' ').map(name => name[0].toUpperCase() + name.slice(1) + ' ')}
                                    </TableCell>
                                    <TableCell align="center">
                                        {/* <Button size="small" onClick={openMenu}>Option</Button>
                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorMenu}
                                            keepMounted
                                            open={Boolean(anchorMenu)}
                                            onClose={closeMenu}
                                        >
                                            <MenuItem onClick={() => openEditUserModal(user.id)}>Edit</MenuItem>
                                            <MenuItem onClick={() => openDeleteUserModal(user.id)}>Delete</MenuItem>
                                        </Menu> */}
                                        <IconButton size="small" onClick={() => openEditUserModal(user)}><EditIcon /></IconButton> | <IconButton size="small" onClick={() => openDeleteUserModal(user.id)}><DeleteIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                    </TableBody>
                </Table>
            </TableContainer>

            <Modal show={modal.show} title={modal.title} confirmText={modal.confirmText} cancelText={'Cancel'}
                handleConfirm={proceedModal}
                handleCancel={closeModal} fullWidth={true}>
                <div>
                    {mode !== 'delete' ?
                        <form className={classes.root} autoComplete="off">
                            <TextField fullWidth label="Username" name="username" variant="outlined" required onChange={handleFormChanges} value={form.username} />
                            <TextField fullWidth label="Name" name="name" variant="outlined" required onChange={handleFormChanges} value={form.name} />
                            <FormControlLabel
                                control={<Switch checked={checkPassword} onChange={changeCheckPassword} />}
                                label="Password"
                            />
                            {checkPassword ?
                                <TextField fullWidth label="Password" name="password" variant="outlined" required onChange={handleFormChanges} value={form.password} />
                                : null}
                            {error ? <small>{error}</small> : null}
                        </form>
                        :
                        <p>Are you sure ?</p>
                    }

                </div>
            </Modal>

        </div>
    );
}
