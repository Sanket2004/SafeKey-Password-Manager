import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import PasswordDetailspage from './PasswordDetailspage';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';


function Data() {
    const [passwords, setPasswords] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDocRef = collection(db, "users", user.uid, "password");
                    const querySnapshot = await getDocs(query(userDocRef, orderBy("createdAt", "desc")));
                    const passwordData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setPasswords(passwordData);
                }
            } catch (error) {
                console.error('Error fetching passwords:', error.message);
                toast.error('Error fetching passwords');
            }
        };


        const interval = setInterval(() => {
            fetchData();
        }, 500);

        return () => {
            // Cleanup function
            clearInterval(interval);
        };
    }, []); // Empty dependency array to run the effect only once

    // Function to format timestamp to "dd-mm-yy hh-mm-ss"
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert Firestore timestamp to milliseconds
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(2);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };

    // Function to check if a timestamp is from today
    const isToday = (timestamp) => {
        const today = new Date(); // Get today's date
        const formattedTimestamp = new Date(timestamp * 1000); // Convert timestamp to date object

        // Compare year, month, and day
        return (
            today.getFullYear() === formattedTimestamp.getFullYear() &&
            today.getMonth() === formattedTimestamp.getMonth() &&
            today.getDate() === formattedTimestamp.getDate()
        );
    };

    const [showPopup, setShowPopup] = useState(false);

    const toggle = () => {
        setShowPopup(!showPopup);
        document.body.classList.toggle('overflow-hidden');
    };

    const [showPopupId, setShowPopupId] = useState(null); // Add this line
    const deletePassword = async (id) => {
        try {
            const user = auth.currentUser;
            if (user) {
                await deleteDoc(doc(db, "users", user.uid, "password", id)); // Delete the password document
            }
        } catch (error) {
            console.error("Error deleting password: ", error);
            toast.error('Error deleting password');
        }
    };

    const [dob, setDob] = useState(''); // State to store the entered DOB

    const checkDob = async (id, event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const user = auth.currentUser;
        console.log(dob);
        if (user) {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();
            if (userData.dob === dob) {
                toast.success('Authenticated !')
                setShowPopupId(id); // Show the password if the DOBs match
                toggle(); // Close the modal
            } else {
                toast.error("Incorrect DOB. Please try again."); // Alert the user if the DOBs do not match
                setDob('')
            }
        }
    };



    return (
        <>
            <Toaster position='top-right' />
            <div className='relative mx-auto max-w-screen-xl h-auto px-8 lg:px-10 mt-44 grid grid-cols-1 md:grid-cols-2 gap-6'>
                {passwords.length > 0 ? (
                    passwords.map((password, index) => (
                        <div key={password.id} className={`bg-gray-100 rounded-xl text-wrap break-words relative px-10 py-8 max-h-max h-max ${index === passwords.length - 1 ? 'mb-32' : ''}`}>
                            {password.createdAt && isToday(password.createdAt.seconds) ?
                                <p className='absolute top-2 right-2 text-sm bg-green-500 text-white px-2 py-1 rounded-xl'>New</p> // Chip indicating created today
                                : ""}
                            <p className='text-lg font-bold pb-2'>{password.website}</p>
                            <button
                                onClick={toggle} // Open the modal when the button is clicked
                                className="pb-2 cursor-pointer"
                                type="button">
                                Show Password
                                <i className="ri-arrow-right-s-line" />
                            </button>
                            {showPopupId === password.id ? <PasswordDetailspage password={password.website} /> : ''}
                            {password.createdAt && isToday(password.createdAt.seconds) ?
                                <p className='text-xs'>Added At: {formatTimestamp(password.createdAt.seconds)}</p>
                                : ""}
                            {/* // Only show the PasswordDetailspage if the showPopupId matches the current password's id */}

                            <button
                                onClick={() => deletePassword(password.id)} // Call the deletePassword function when the button is clicked
                                className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
                                type="button">
                                Delete Password
                            </button>

                            {showPopup ?
                                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 backdrop-blur-sm">

                                    <div
                                        className="bg-gray-100 py-14 px-10 rounded-lg mx-auto max-w-2xl w-full top-1/2 fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-balck flex flex-col gap-8"
                                        contentLabel="Enter DOB"
                                    >
                                        <button
                                            className="text-gray-600 hover:text-gray-900 absolute right-4 top-4"
                                            onClick={toggle}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        <div className="">
                                            <h2 className='text-center text-2xl font-bold pb-2'>Enter Your DOB</h2>
                                            <p className='text-center'>This is an additional security measure to securely store and retrieve your passwords, ensuring no data breaches.</p>
                                        </div>
                                        <form className='flex flex-col gap-4'>
                                        <label htmlFor="dob" className="block text-sm text-gray-600">Enter your DOB (dd-mm-yy)</label>
<input id="dob" className="w-full rounded-lg bg-[transparent] border border-gray-200 p-4 pe-12 text-sm shadow-sm" type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
                                            <button className="w-full inline-block rounded-lg bg-[#757493] px-5 py-3 text-sm font-medium text-white"
                                                onClick={(event) => checkDob(password.id, event)}>Authenticate</button> {/* Pass the event to the checkDob function */}

                                        </form>
                                    </div>
                                </div>
                                : ""
                            }

                        </div>
                    ))
                ) : (
                    <p className=''>No passwords available. Please add a password.</p> // Show this paragraph when there are no passwords
                )}
            </div>
        </>
    );
}

export default Data;
