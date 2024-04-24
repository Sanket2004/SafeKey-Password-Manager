import React from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {

  const navigate = useNavigate();

  return (
    <div>
      <div className="grid h-screen place-content-center bg-white px-4 justify-center gap-8">
        <h1 className="uppercase tracking-widest text-gray-500 text-center">404 | Not Found</h1>
        <button 
        onClick={()=> navigate('/')}
        className="flex flex-row gap-4 items-center justify-center shrink-0 rounded-md border border-[#757493] bg-[#757493] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#757493] focus:outline-none focus:ring active:text-[#757493]"
        >
          Go Back Home
        </button>
      </div>
    </div>
  )
}

export default ErrorPage
