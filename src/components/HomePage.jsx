import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, doc, getDoc, serverTimestamp, addDoc } from 'firebase/firestore';
import Navbar from './Navbar';
import LoadingSkeleton from './LoadingSkeleton';
import AddPasswordForm from './AddPasswordForm';
import Data from './Data';
import { encode as btoa, decode as atob } from 'base-64';
import toast, { Toaster } from 'react-hot-toast';


function HomePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [website, setWebsite] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
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

    fetchUserData(); // Call fetchUserData here

  }, []); // Empty dependency array means this effect runs only once when component mounts



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
        const encodedPassword = btoa(password); // Encode the password
        await addDoc(userDocRef, {
          website: website,
          password: encodedPassword, // Store the encoded password
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
      <Toaster position='top-right' />
      {userData == null ? (
        <LoadingSkeleton />
      ) : (
        <div className='mx-auto max-w-screen-xl h-[calc(100vh - 180px)] relative'>
          <Navbar handleLogout={handleLogout} avatar={userData.avatar} fullName={userData.fullName} />
           <Data />
        </div>
      )}
    </div>
  );
}

export default HomePage;
