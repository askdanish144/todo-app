import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar/Navbar';
import { handleSignIn } from '../services/AuthServices';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const SignIn = () => {
    const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AppContext);

    const emailRef = useRef('');
    const passwordRef = useRef('');

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const result = await handleSignIn(
                emailRef.current.value,
                passwordRef.current.value
            );

            if (result.success) {
                setIsLoggedIn(true);
                setUser(result.user);
                emailRef.current.value = "";
                passwordRef.current.value = "";
                navigate('/');
            }

        } catch (err) {
            setMessage(err.message || "Something went wrong.");

        } finally {
            setLoading(false);
            setTimeout(() => setMessage(""), 5000);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-purple-100 px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 lg:flex-row">
                    <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl shadow-indigo-100 backdrop-blur sm:p-10">
                        <div className="mb-8 text-center">
                            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-600">Welcome back</p>
                            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Sign in to your account</h1>
                            <p className="mt-3 text-sm text-slate-600 sm:text-base">Manage your tasks with a clear, focused workspace.</p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    ref={emailRef}
                                    placeholder="you@example.com"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-indigo-500 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    ref={passwordRef}
                                    placeholder="Enter your password"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white"
                                />
                            </div>

                            {message && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{message}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-600">
                            New here?{' '}
                            <Link to="/signup" className="font-semibold text-indigo-600 transition hover:text-indigo-700">
                                Create an account
                            </Link>
                        </p>
                    </div>

                    <div className="w-full max-w-md rounded-3xl bg-slate-900 p-8 text-white shadow-2xl sm:p-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-300">Stay organized</p>
                        <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">A simple place for your daily plans.</h2>
                        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                            Sign in to keep track of your tasks, stay on top of deadlines, and enjoy a calm, focused planning experience.
                        </p>
                        <div className="mt-8 space-y-3 text-sm text-slate-200">
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">• Quick access to your to-do list</div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">• Clean, responsive experience on every screen</div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">• Simple sign in and sign up flow</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
