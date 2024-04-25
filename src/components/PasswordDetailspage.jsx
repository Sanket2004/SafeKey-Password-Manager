import React, { useState } from 'react';
import Navbar from './Navbar';
import toast from 'react-hot-toast';

function PasswordDetailspage({ password }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    // Create a temporary textarea element to hold the password
    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();

    // Execute the copy command
    document.execCommand('copy');

    // Remove the temporary textarea
    document.body.removeChild(textarea);

    // Set the copied state to true
    setCopied(true);
    toast.success('Password copied to clipboard');

    // Reset the copied state to false after 3 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className='flex flex-row justify-between items-center pb-2'>
      <p className=' font-medium text-base'>{password}</p>
      {copied ? <button><i class="ri-check-line"></i></button> :
        <button onClick={copyToClipboard}><i className="ri-clipboard-line"></i></button>}
    </div>
  );
}

export default PasswordDetailspage;
