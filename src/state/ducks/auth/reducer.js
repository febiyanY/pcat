import * as types from './types'

const initialState = {
    user: null,
    authLoading: true,
    error: null,
    isAuth: false
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case types.AUTH_SUCCEED:
            return {
                user: action.payload,
                authLoading: false,
                error: null,
                isAuth: true
            }
        case types.AUTH_FAILED:
            return {
                authLoading: false,
                error: action.err,
                isAuth: false,
                user: null
            }
        case types.LOGOUT:
            return {
                ...state,
                isAuth: false,
                user: null
            }
        case types.CHECK_AUTH_FAILED:
            return {
                user: null,
                authLoading: false,
                error: null,
                isAuth: false
            }
        default:
            return state
    }
}

export default reducer