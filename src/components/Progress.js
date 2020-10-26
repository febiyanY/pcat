import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        position: 'fixed',
        top: '0',
        // zIndex: '10'
    },
}));

export default function LinearIndeterminate(props) {
    const classes = useStyles();
    const { loading } = useSelector(state => state.ui)

    return (
        <React.Fragment>
            {loading || props.show ?
                <div className={classes.root}>
                    <LinearProgress color="secondary" />
                </div>
                :
                null
            }
        </React.Fragment>

    );
}
