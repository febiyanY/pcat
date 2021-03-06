import { NProgress } from '@tanem/react-nprogress'
import React from 'react'
import Bar from './nProgress/Bar'
import Container from './nProgress/Container'
import './nProgress/index.css'
import {useSelector} from 'react-redux'

const Nprogress = props => {
    const {loading} = useSelector(state => state.ui)
    
    return (
        <NProgress isAnimating={props.show || loading} >
        {({ isFinished, progress, animationDuration }) => (
            <Container
                isFinished={isFinished}
                animationDuration={animationDuration}
            >
                <Bar
                    progress={progress}
                    animationDuration={animationDuration}
                />

            </Container>
        )}
    </NProgress>
    )
}

export default Nprogress