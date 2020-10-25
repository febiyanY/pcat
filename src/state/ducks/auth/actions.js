import * as types from './types'

export const authSucceed = (payload) => ({
    type: types.AUTH_SUCCEED,
    payload
})
export const authFailed = (err) => ({
    type: types.AUTH_FAILED,
    err
})
export const logout = () => ({
    type: types.LOGOUT
})
export const loadUserData = (payload) => ({
    type: types.LOAD_USER_DATA,
    payload
})
export const checkAuthFailed = () => ({
    type: types.CHECK_AUTH_FAILED
})
