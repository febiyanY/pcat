import {setDrawer, setLoading} from './actions'

export const onSetDrawer = (data) => dispatch => {
    dispatch(setDrawer(data))
}

export const onSetLoading = (data) => dispatch => {
    dispatch(setLoading(data))
}