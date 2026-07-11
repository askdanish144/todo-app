const PORT = 'http://localhost:3001';

// SignUp.. 
export const handleSignUp = async (name, email, password, confirmPassword) => {

    try {
        const response = await fetch(`${PORT}/api/auth/sign-up`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, confirmPassword }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Sign up failed.');
        }

        return result;

    } catch (err) {
        console.error('Service error during sign-up:', err);
        throw err;
    }
};

// SignIn.. 
export const handleSignIn = async (email, password) => {

    try {
        const response = await fetch(`${PORT}/api/auth/sign-in`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include', // <-- This allows cookies to be sent/received
        });

        // 1. Parse the JSON immediately 
        const result = await response.json();

        // 2. Check if the HTTP status code is NOT in the 200-299 range
        if (!response.ok) {
            throw new Error(result.message || 'Sign in failed.');
        };

        // 3. Return the clean parsed object (contains success, user, token, etc.)
        return result;
    } catch (err) {
        console.error('Service error during sign-in:', err);
        throw err;
    }
};


// SignOut.. 
export const handleSignOut = async (setIsLoggedIn, setUser) => {

    try {
        const response = await fetch(`${PORT}/api/auth/sign-out`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // <-- This allows cookies to be sent/received
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Sign in failed.');
        };

        if (result.success) {
            // Safely update state now that backend sessions are destroyed..
            setIsLoggedIn(false);
            setUser(null);
        } else {
            console.error("Logout execution failed:", result.message);
        }
    } catch (err) {
        console.error('Service error during sign-out:', err);
        throw err;
    }
};