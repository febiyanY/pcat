import React, { useState, useEffect, useCallback } from 'react'
import QrReader from 'react-qr-reader'
import axios from '../axios/axios-default'
import io from 'socket.io-client'
import udahAbsenGif from '../assets/gifs/udahabsen.gif'
import salahHariGif from '../assets/gifs/salahhari.gif'

export default function QrScanner(props) {
    
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)
    const [userStatus, setUserStatus] = useState(null)
    const [socket, setSocket] = useState(null)
    const [gif, setGif] = useState(null)

    const checkAttendance = useCallback(() => {
        axios.get('/attendance/check').then(res => {
            setUserStatus(res.data)
        }).catch(err => {
            const errMsg = err.response.data
            if(errMsg.message==='you are not in todays schedule'){
                setGif(salahHariGif)
            }else if(errMsg.message==='udah absen'){
                setGif(udahAbsenGif)
            }
            setUserStatus(err.response.data)
        })
    }, [])

    useEffect(() => {
        checkAttendance()
        setSocket(() => io(process.env.REACT_APP_API_URL + '/qrcode'))
    }, [checkAttendance, ])

    useEffect(() => {
        if (result) {
            axios.post('/attendance', { attendCode: result }).then(res => {
                socket.emit('absenSuccess')
                setUserStatus({ message: 'Success' })
                setError(null)
                setGif(udahAbsenGif)
            }).catch(err => {
                setError(err.response.data.message)
            })
        }
    }, [result, socket, checkAttendance])

    const handleScan = data => {
        if (data) {
            setResult(data)
        }
    }
    const handleError = err => {
        console.error(err)
    }

    if (!userStatus) return <p>Loading...</p>

    return (
        <div style={{textAlign: 'center'}}>
            {userStatus.status === 200 ?
                <React.Fragment>
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '100%' }}
                    />
                    {/* <p>{result}</p> */}
                </React.Fragment>
                :
                
                <div> 
                    <h4>{userStatus.message}</h4>
                    <img src={gif} alt='sus' style={{width: '100%'}} />
                </div>
                
            }
            {error ?
                <p>Error: {error}</p>
                :
                null
            }

        </div>
    )
}