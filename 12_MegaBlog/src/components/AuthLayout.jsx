import React, { useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ childern, authentication = true}) {

    const navigate = useNavigate()
    const {loder, setLoder} = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: makr it more easy to understand

        // if(authStatus ===true){
        //     navigate("/")
        // }else if(authStatus === false){
        //     navigate("/login")
        // }

        if(authentication && authStatus !== authentication){
            navigate("/login")
        }else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoder(false)

    }, [authStatus, navigate, authentication])

  return loder ? <h1>Loading...</h1> : <>{childern}</>
}

