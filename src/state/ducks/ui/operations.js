import {setDrawer, setLoading} from './actions'

export const onSetDrawer = (data) => dispatch => {
    dispatch(setDrawer(data))
}

export const onSetLoading = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(setLoading(data))
        resolve()
    })
}