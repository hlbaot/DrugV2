'use client'
import { createContext, useContext, useEffect} from 'react'
import socketComment from '@/src/lib/socketComment'

const SocketCmtContext = createContext(socketComment)

export const SocketCmtProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <SocketCmtContext.Provider value={socketComment}>
            {children}
        </SocketCmtContext.Provider>
    )
}

export const useSocketCmt = () => useContext(SocketCmtContext)
