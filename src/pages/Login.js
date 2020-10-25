import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useSelector, useDispatch } from 'react-redux'
import { onAuth } from '../state/ducks/auth'
import { Redirect } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '95%',
        },
    },
}));

const Login = props => {
    const classes = useStyles();

    const dispatch = useDispatch()
    const { user, error } = useSelector(state => state.auth)
    const [form, setForm] = useState({ username: '', password: '' })

    const handleFormChanges = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setForm(() => ({
            ...form, [name]: value
        }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        dispatch(onAuth(form))
        // console.log(form)
    }

    if (user) {
        if (user.type === 'admin') return <Redirect to='/dashboard' />
        if (user.type === 'client') return <Redirect to='/absen' />
    }
    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <h4>Login</h4>
            </div>
            <div style={{ textAlign: 'center' }}>
                <form className={classes.root} autoComplete="off" onSubmit={handleFormSubmit}>
                    <TextField label="Username" name="username" variant="outlined" required onChange={handleFormChanges} value={form.username} />
                    <TextField label="Password" type="password" name="password" variant="outlined" required onChange={handleFormChanges} value={form.password} />
                    <Button variant="contained" color="primary" type="submit"> Login </Button> <br></br>
                    {error ? <small style={{color:'red'}}>{error}</small> : null}
                </form>
            </div>

        </div>
    )
}


export default Login