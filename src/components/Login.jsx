import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import the signInWithEmailAndPassword function
import { auth } from '../firebase'; // Import your Firebase auth instance
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Use useNavigate hook

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Sign in with email and password
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Logged in successfully!');
            // Clear form fields
            setEmail('');
            setPassword('');
            setLoading(false);
            setErr(false); // Reset error state
            navigate('/'); // Navigate to the desired route after successful login
        } catch (error) {
            console.error('Error logging in:', error.message);
            // Show error message
            toast.error(error.message);
            setErr(true);
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster position='top-right' />
            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-3 lg:h-full xl:col-span-4">
                        <img
                            alt=""
                            src="https://plus.unsplash.com/premium_photo-1675329253568-447ff9cc04a3?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            className="absolute inset-0 h-full w-full object-cover opacity-80"
                        />

                        <div className="hidden lg:hidden lg:block lg:p-12">
                            <a className="block text-white" href="#">
                                {/* <img src={getGravatarUrl(email)} className='h-full p-2 rounded-full border' alt="Avatar" /> */}
                            </a>

                            <h2 className="mt-6 text-2xl font-bold text-[#757493] sm:text-3xl md:text-4xl">
                                Login to SafeKey
                            </h2>

                            <p className="mt-4 leading-relaxed text-white/90">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                                quibusdam aperiam voluptatum.
                            </p>
                        </div>
                    </section>

                    <main
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-9 lg:px-16 lg:py-12 xl:col-span-8"
                    >
                        <div className="max-w-xl lg:max-w-3xl w-full h-max">
                            <div className="relative -mt-16 block ">
                                <a
                                    className="inline-flex size-16 items-center justify-center rounded-full  text-[#757493] sm:size-20"
                                    href="#"
                                >
                                    {/* <img src={getGravatarUrl(email)} className='h-full p-2 rounded-full border' alt="Avatar" /> */}
                                </a>

                                <h1 className="mt-2 text-2xl font-bold text-[#757493] sm:text-3xl md:text-4xl">
                                    Login to SafeKey
                                </h1>

                                <p className="mt-4 leading-relaxed text-gray-500">
                                    The secure place to store your important passwords with end-to-end security.
                                </p>
                            </div>

                            <form
                                onSubmit={handleLogin}
                                className="mt-8 grid grid-cols-6 gap-12"
                            >

                                <div className="col-span-6">
                                    <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

                                    <input
                                        type="email" placeholder="jhon@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 w-full h-full border rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm px-4"
                                        required />

                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

                                    <input
                                        type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="mt-1 w-full h-full border rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm px-4"
                                        required />

                                </div>

                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button
                                        className="flex flex-row gap-4 items-center justify-center shrink-0 rounded-md border border-[#757493] bg-[#757493] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#757493] focus:outline-none focus:ring active:text-[#757493]"
                                    >
                                        {loading ?
                                            <svg className='animate-spin h-4 w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C16.9706 3 21 7.02944 21 12H19C19 8.13401 15.866 5 12 5V3Z"></path></svg>
                                            : <p>Login</p>
                                        }
                                    </button>

                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                        Don't have an account? &nbsp;
                                        <Link to="/signup" className="text-gray-700 underline">Signup</Link>.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </section>
        </>

    );
};

export default Login;
