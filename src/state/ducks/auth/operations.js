import {authFailed, authSucceed, logout, checkAuthFailed} from './actions'
import axios from '../../../axios/axios-default'
import {onSetLoading} from '../ui'

export const onAuth = (data) => dispatch => {
    dispatch(onSetLoading(true))
    axios.post('/login', data).then(res => {
        const user = res.data
        dispatch(authSucceed(user))
        dispatch(onSetLoading(false))
    }).catch(err => {
        dispatch(authFailed(err.response.data.message))
        dispatch(onSetLoading(false))
    })
}

// logout
export const onLogout = () => dispatch => {
    axios.get('/logout').then(res => {
        dispatch(logout())
    })
}

// oncheck auth when reloading the page
export const onCheckAuth = () => dispatch => {
    dispatch(onSetLoading(true))
    axios.get('/user/check/auth').then(res => {
        const user = res.data
        dispatch(authSucceed(user))
        dispatch(onSetLoading(false))
    }).catch(err => {
        // dispatch(authFailed(err.response.data.message))
        dispatch(checkAuthFailed())
        dispatch(onSetLoading(false))
    })
}