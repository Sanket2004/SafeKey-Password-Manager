import React, { useState } from 'react'

function Navbar({ fullName, avatar, handleLogout }) {


    return (
        <div className='bg-[#ffffff4d] backdrop-blur-lg	 p-2 fixed top-0 left-1/2 transform -translate-x-1/2 flex justify-between w-full z-50'>
            <header className='block w-full'>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-row gap-4 justify-left items-center text-left">
                            <div className="h-14 w-14 rounded-lg border border-4 overflow-hidden flex-0">
                                <img src={avatar} alt={fullName + "'s Avatar"} className='h-full w-full' />
                            </div>
                            <div className="hidden md:block text-left sm:text-left flex-1">
                                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome Back, {fullName.split(' ')[0]}</h1>
                                <p className="mt-1.5 text-sm text-gray-500">Let's add a new password! 🎉</p>
                            </div>
                        </div>

                        <div className=" flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                            <button
                                className="h-14 block rounded-lg bg-[#757493] px-5 py-3 text-sm font-medium text-white transition hover:brightness-110 focus:outline-none focus:ring"
                                type="button"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar
