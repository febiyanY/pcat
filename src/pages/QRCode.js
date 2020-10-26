import React, {useState, useEffect, useCallback} from 'react'
import QRCode from 'qrcode.react'
import axios from '../axios/axios-default'
import io from 'socket.io-client'
import {
    // useSelector, 
    useDispatch} from 'react-redux'
import {onSetLoading} from '../state/ducks/ui'

export default function TheQRCode(props){
    const [code, setCode] = useState(null)
    const [socket, setSocket] = useState(null)
    const dispatch = useDispatch()
    // const {loading} = useSelector(state => state.ui)

    const loadQrcode = useCallback(() => {
        dispatch(onSetLoading(true))
        axios.get('/attendance/code').then(res => {
            setCode(res.data)
            dispatch(onSetLoading(false))
        })
    },[dispatch])

    useEffect(() => {
        loadQrcode()
        setSocket(io(process.env.REACT_APP_API_URL+'/qrcode'))
    },[loadQrcode])

    useEffect(() => {
        if(socket){
            socket.emit('displayQrCode')
            socket.on('regenerate', () => {
                loadQrcode()
            })
        }
    },[socket, loadQrcode])

    if(!code) return null
    return (
        <div style={{textAlign: 'center'}}>
            <h3>Scan Me</h3>
            <QRCode value={code.attendCode} size={300} />
        </div>
    )
}
