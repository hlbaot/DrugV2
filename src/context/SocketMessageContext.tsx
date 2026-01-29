'use client'
import {createContext, useContext} from 'react'
import socketMessage from '@/src/lib/socketMessage'

const SocketMsgContext = createContext(socketMessage)

export const SocketMsgProvider = ({children}: {children: React.ReactNode}) => {
    return (
        <SocketMsgContext.Provider value={socketMessage}>
            {children}
        </SocketMsgContext.Provider>
    )
}

export const useSocketMsg = () => useContext(SocketMsgContext)
