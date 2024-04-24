import React from 'react'
import Navbar from './Navbar'

function PasswordDetailspage({password}) {
  return (
    <div>
      <p className='pb-2 font-medium'>{password}</p>
    </div>
  )
}

export default PasswordDetailspage
