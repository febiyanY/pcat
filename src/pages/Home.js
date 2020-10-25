import React from 'react'
import {useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'

const Home = props => {
    const {isAuth} = useSelector(state => state.auth)
    return (
        <React.Fragment>
            {isAuth ? <Redirect to='/dashboard' /> : <Redirect to='/login' />}        
        </React.Fragment>
        
    )
}
export default Home