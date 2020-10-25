import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {useDispatch} from 'react-redux'
import NavLink from './NavLink'
import {onSetDrawer} from '../state/ducks/ui'

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    
    const closeDrawer = () => {
        dispatch(onSetDrawer(false))
    }

    return (
        <div>
            <Drawer anchor='left' open={props.show} onClose={closeDrawer}>
                <div
                    className={clsx(classes.list)}
                    role="presentation"
                    onClick={closeDrawer}
                >
                    <NavLink />
                </div>
            </Drawer>
        </div>
    );
}
