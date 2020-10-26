import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import publicIp from 'public-ip'
import axios from '../axios/axios-default'
import {useDispatch} from 'react-redux'
import {onSetLoading} from '../state/ducks/ui'

const SetIp = props => {
    const [myIp, setMyIp] = useState('')
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(onSetLoading(true))
        publicIp.v4().then(res => {
            console.log({ IP: res })
            setMyIp(res)
            setLoading(false)
            dispatch(onSetLoading(false))
        })

    }, [dispatch])

    const handleFormChange = (e) => {
        setMyIp(e.target.value)
    }

    const handleFormSubmit = (e) => {
        dispatch(onSetLoading(true))
        e.preventDefault()
        axios.post('/attendance/setip', {ip: myIp}).then(res => {
            console.log(res.data)
            dispatch(onSetLoading(false)).then(() => {
                alert('Success')
            })
            
        })
    }

    if (loading) return null

    return (
        <div style={{ textAlign: 'center' }}>
            <h4>Set IP</h4>
            <form onSubmit={handleFormSubmit}>
                <TextField variant='outlined' name="ip" style={{ width: '95%' }} value={myIp} label="Current IP" onChange={handleFormChange} required />
                <Button variant="contained" color="primary" type="submit" >Set</Button>
            </form>


        </div>
    )

}

export default SetIp