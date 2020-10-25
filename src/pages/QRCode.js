import React, {useState, useEffect} from 'react'
import QRCode from 'qrcode.react'
import axios from '../axios/axios-default'
import io from 'socket.io-client'

export default function TheQRCode(props){
    const [code, setCode] = useState(null)
    const [socket, setSocket] = useState(null)

    const loadQrcode = () => {
        axios.get('/attendance/code').then(res => {
            setCode(res.data)
        })
    }

    useEffect(() => {
        loadQrcode()
        setSocket(io(process.env.REACT_APP_API_URL+'/qrcode'))
    },[])

    useEffect(() => {
        if(socket){
            socket.emit('displayQrCode')
            socket.on('regenerate', () => {
                loadQrcode()
            })
        }
    },[socket])

    useEffect(() => {

    })

    if(!code) return <p>Loading...</p>
    return (
        <div style={{textAlign: 'center'}}>
            <h3>Scan Me</h3>
            <QRCode value={code.attendCode} size={300} />
        </div>
    )
}
