import * as types from './types'

const initialState = {
    loading: false,
    drawer: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case types.SET_LOADING:
            return {...state, loading: action.payload}
        case types.SET_DRAWER:
            return {...state, drawer: action.payload}
        default:
            return state
    }
}

export default reducer