'use client'

import ModalMore from './modal_more'
import { useState } from 'react'

function Header() {
    const [modalMore, setModalMore] = useState(false)
    return (
        <div className=" flex justify-around items-center w-[100%] h-[auto] fixed top-0 bg-white lg:hidden py-2 border-b border-gray z-40">

            {/* search */}
            <div className="w-[60%] bg-white border border-black rounded-full flex justify-around items-center gap-2">
                <input type="text" className="border-none h-full w-full rounded-full focus:outline-none focus:ring-0" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>

            {/* noti & more */}
            <div className="w-[25%] flex items-center justify-around">
                {/* noti */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                    className="icon w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 
          5.454-1.31A8.967 8.967 0 0 1 
          18 9.75V9A6 6 0 0 0 6 9v.75a8.967 
          8.967 0 0 1-2.312 6.022c1.733.64 
          3.56 1.085 5.455 1.31m5.714 0a24.255 
          24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 
          1-5.714 0" />
                </svg>

                {/* more */}
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="icon w-7 h-7 cursor-pointer"
                        onClick={() => setModalMore(prev => !prev)}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 5.25h16.5m-16.5 
       4.5h16.5m-16.5 4.5h16.5m-16.5 
       4.5h16.5"
                        />
                    </svg>
                    {modalMore && <ModalMore />}
                </div>

            </div>

        </div>
    )
}

export default Header