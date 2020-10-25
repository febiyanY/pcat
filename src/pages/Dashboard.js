import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'

const Dashboard = props => {
    const { user } = useSelector(state => state.auth)

    return (
        <div style={{ textAlign: 'center', margin: '2%' }}>
            <Typography variant="h2" gutterBottom>
                Welcome
            </Typography>
            <Typography variant="h6" gutterBottom>
                {user.name}
            </Typography>
        </div>
    )
}

export default Dashboard