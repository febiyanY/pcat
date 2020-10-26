import React from 'react'
import {useSelector} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'
import Progress from '../components/Progress'

export const GenerateRoute = props => {
    const {authLoading, user} = useSelector(state => state.auth)
    return (
        <Route
        path={props.path}
        exact={props.exact}
        render={routeProps => {
            if(authLoading) return <Progress show />

            if(props.auth){
                if(!user) return <Redirect to='/login' />
                if(props.roles){
                    if(!props.roles.includes(user.type)) return <Redirect to='/login' />
                    return <props.component routes={props.routes} {...routeProps} />
                }else{
                    return <props.component routes={props.routes} {...routeProps} />
                }
            }else{
                return <props.component routes={props.routes} {...routeProps} />
            }
        }}
    />
    )
}

export const routeList = [
    { path: '/', component: React.lazy(() => import('../pages/Home')), exact: true },
    { path: '/login', component: React.lazy(() => import('../pages/Login')), exact: true },
    { path: '/logout', component: React.lazy(() => import('../pages/Logout')), auth:true, exact: true },
    { path: '/dashboard', component: React.lazy(() => import('../pages/Dashboard')), auth:true, roles:['admin'], exact: true }, 
    { path: '/schedule', component: React.lazy(() => import('../pages/Schedule')), auth:true, roles:['admin'], exact: true }, 
    { path: '/users', component: React.lazy(() => import('../pages/User')), auth:true, roles:['admin'], exact: true }, 
    { path: '/attendance', component: React.lazy(() => import('../pages/Attendance')), auth:true, roles:['admin'], exact: true }, 
    { path: '/qrcode', component: React.lazy(() => import('../pages/QRCode')), auth:true, roles:['admin'], exact: true }, 
    { path: '/absen', component: React.lazy(() => import('../pages/Scanner')), auth:true, roles:['client'], exact: true }, 
    { path: '/setip', component: React.lazy(() => import('../pages/SetIp')), auth:true, roles:['admin'], exact: true }, 
    
]