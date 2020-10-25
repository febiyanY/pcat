import React from 'react'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import CropFreeIcon from '@material-ui/icons/CropFree';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useSelector } from 'react-redux'

export default function NavLink(props) {
    const { user } = useSelector(state => state.auth)
    return (
        <div>
            {user && user.type === 'admin' ?
                <React.Fragment>
                    <List>
                        <ListItem button key={'Schedule'} component={Link} to={'/schedule'}>
                            <ListItemIcon><ScheduleIcon /></ListItemIcon>
                            <ListItemText primary={'Schedule'} />
                        </ListItem>
                        <ListItem button key={'Attendance'} component={Link} to={'/attendance'}>
                            <ListItemIcon><AssignmentTurnedInIcon /></ListItemIcon>
                            <ListItemText primary={'Attendance'} />
                        </ListItem>
                        <ListItem button key={'Users'} component={Link} to={'/users'}>
                            <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
                            <ListItemText primary={'Users'} />
                        </ListItem>
                        <ListItem button key={'QRCode'} component={Link} to={'/qrcode'}>
                            <ListItemIcon><CropFreeIcon /></ListItemIcon>
                            <ListItemText primary={'QRCode'} />
                        </ListItem>
                        <ListItem button key={'SetIP'} component={Link} to={'/setip'}>
                            <ListItemIcon><CropFreeIcon /></ListItemIcon>
                            <ListItemText primary={'Set IP'} />
                        </ListItem>
                    </List>
                    <Divider />
                </React.Fragment> : null
            }

            <List>
                {user ?
                    <ListItem button key={'Logout'} component={Link} to={'/logout'}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary={'Logout'} />
                    </ListItem> :
                    <ListItem button key={'Login'} component={Link} to={'/login'}>
                        <ListItemIcon><VpnKeyIcon /></ListItemIcon>
                        <ListItemText primary={'Login'} />
                    </ListItem>
                }

            </List>
        </div>
    )

}