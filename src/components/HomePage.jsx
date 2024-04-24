import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, doc, getDoc, serverTimestamp, addDoc } from 'firebase/firestore';
import Navbar from './Navbar';
import LoadingSkeleton from './LoadingSkeleton';
import AddPasswordForm from './AddPasswordForm';
import Data from './Data';
import bcrypt from 'bcryptjs';
import toast, { Toaster } from 'react-hot-toast';


function HomePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [website, setWebsite] = useState('');
  const [password, setPassword] = useState('');

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = { ...userDocSnap.data(), id: userDocSnap.id };
          setUserData(userData);
          console.log(userData);
        } else {
          console.log('User data not found');
          toast.error('User data not found');
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      toast.error('Error fetching user data !!')
    }
  };

  useEffect(() => {
    fetchUserData();

    const interval = setInterval(() => {
      fetchUserData();
    }, 500);

    // Cleanup function
    return () => {
      clearInterval(interval);
    };
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    document.body.classList.toggle('overflow-hidden');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = collection(db, "users", user.uid, "password");
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        await addDoc(userDocRef, {
          website: website,
          password: hashedPassword, // Store the hashed password
          createdAt: serverTimestamp()
        });
        toast.success('Password added successfully!');
        window.scrollTo(0, 0);
        setWebsite('');
        setPassword('');
        togglePopup();
      }
    } catch (error) {
      console.error('Error adding password:', error.message);
      toast.error('Error adding password!');
    }
  };


  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success('Logout sucessfully!')
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
      toast.error('Error logging out !!');
    }
  };

  return (
    <div>
      <Toaster position='top-right'/>
      {userData == null ? (
        <LoadingSkeleton />
      ) : (
        <div className='mx-auto max-w-screen-xl h-[calc(100vh - 180px)] relative'>
          <Navbar handleLogout={handleLogout} avatar={userData.avatar} fullName={userData.fullName} />
          <button
            className="fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-8 z-10 h-14 rounded-lg bg-[#757493] px-5 py-3 text-sm font-medium text-white transition hover:brightness-110 focus:outline-none focus:ring"
            type="button"
            onClick={togglePopup}
          >
            Add Password
          </button>
          {showPopup && <AddPasswordForm handleSubmit={handleSubmit} togglePopup={togglePopup} website={website} setWebsite={setWebsite} password={password} setPassword={setPassword} />}
          <Data />
        </div>
      )}
    </div>
  );
}

export default HomePage;
