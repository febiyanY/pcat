import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {onLogout} from '../state/ducks/auth'
import {Redirect} from 'react-router-dom'

export default function Logout(props){
    const dispatch = useDispatch()
    const {isAuth} = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(onLogout())
    },[dispatch])

    return (
        <React.Fragment>
            {!isAuth ? <Redirect to='/login' /> : null}
        </React.Fragment>
    )
}