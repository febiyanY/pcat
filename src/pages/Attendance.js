import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import axios from '../axios/axios-default'
import {useDispatch} from 'react-redux'
import {onSetLoading} from '../state/ducks/ui'

export default function Attendance(props) {
    const today = new Date()
    const [attendances, setAttendances] = useState(null)
    const [date, setDate] = useState(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(onSetLoading(true))
        axios.get(`/attendance/perday?date=${date}`).then(res => {
            setAttendances(res.data)
            dispatch(onSetLoading(false))
        })
    }, [date, dispatch])

    const changeDate = (e) => {
        setDate(e.target.value)
    }

    return (
        <div style={{ margin: '1%' }}>
            <div style={{ textAlign: 'center' }}>
                <h4>Attendances</h4>
            </div>
            <TextField variant="outlined" type="date" name="date" value={date} fullWidth onChange={changeDate} />
            {/* <Button>Get</Button> */}
            <div>
                {attendances ?
                    <React.Fragment>
                        <div style={{ textAlign: 'center' }}>
                            <h5>{attendances.name}</h5>
                        </div>
                        <List>
                            {attendances.schedule.map(att => {
                                const style= att.Attendances.length === 0 ? {backgroundColor: 'rgb(242, 138, 138)'} : {}
                                return (
                                    <div key={att.id}>
                                        <ListItem role={undefined} style={style}>
                                            <ListItemText primary={att.name.split(' ').map(name => name[0].toUpperCase() + name.slice(1) + ' ')} />
                                        </ListItem>
                                    </div>
                                )
                            })}
                        </List>
                    </React.Fragment>

                    :
                    null
                }

            </div>


        </div>
    )

}