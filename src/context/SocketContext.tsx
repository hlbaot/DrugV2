'use client'
import { createContext, useContext, useEffect } from 'react'
import socket from '@/src/lib/socket'

const SocketContext = createContext(socket)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext)
