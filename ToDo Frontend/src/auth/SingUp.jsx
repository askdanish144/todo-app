import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar/Navbar';
import { handleSignUp } from '../services/AuthServices';

const SignUp = () => {

  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {

      if (passwordRef.current.value != confirmPasswordRef.current.value) {
        passwordRef.current.value = '',
          confirmPasswordRef.current.value = '',
          setMessage("Passwords doesn't match");
        setLoading(false);
        return;
      };

      const result = await handleSignUp(
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value,
        confirmPasswordRef.current.value,
      );


      if (!result.success) {
        console.log("Your result in frontend is: ", result);
        const errorText = Array.isArray(result.message) ? result.message[0] : (result.message || 'Error occured');
        setMessage(errorText);

      } else {
        nameRef.current.value = '',
          emailRef.current.value = '',
          passwordRef.current.value = '',
          confirmPasswordRef.current.value = '',
          navigate("/signin");
      }

    } catch (err) {
      setMessage(err.message || "Something went wrong.");

    } finally {
      setLoading(false);
      setTimeout(() => setMessage(), 5000);
    }
  };



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');

  //   try {
  //     //   const response = await fetch('http://localhost:3001/api/auth/signup', {
  //     //     method: 'POST',
  //     //     headers: { 'Content-Type': 'application/json' },
  //     //     body: JSON.stringify(formData),
  //     //   });

  //     //   const data = await response.json();

  //     //   if (!response.ok) {
  //     //     throw new Error(data.message || 'Sign up failed.');
  //     //   }

  //     navigate('/signin');
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-purple-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 lg:flex-row">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl shadow-indigo-100 backdrop-blur sm:p-10">
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-600">Create account</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Join ToDo App</h1>
              <p className="mt-3 text-sm text-slate-600 sm:text-base">Create your account and start organizing your day in minutes.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  ref={nameRef}
                  placeholder="Enter your full name"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  ref={emailRef}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="flex w-full flex-col gap-4 sm:flex-row">
                <div className="w-full sm:flex-1">
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    ref={passwordRef}
                    placeholder="Create a strong password"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="w-full sm:flex-1">
                  <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-700">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    ref={confirmPasswordRef}
                    placeholder="Confirm your password"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              {message ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{message}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
              >
                {loading ? 'Creating account...' : 'Sign up'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/signin" className="font-semibold text-indigo-600 transition hover:text-indigo-700">
                Sign in
              </Link>
            </p>
          </div>

          <div className="w-full max-w-md rounded-3xl bg-slate-900 p-8 text-white shadow-2xl sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-300">Plan smarter</p>
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Everything you need to stay on top of your day.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              Register today to create tasks, capture priorities, and keep your routine clear and simple.
            </p>
            <div className="mt-8 space-y-3 text-sm text-slate-200">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">• Organize every task in one place</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">• Responsive design for desktop and mobile</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">• Secure and straightforward account setup</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
