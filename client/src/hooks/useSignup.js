import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (name, email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch("https://dyflexisquestionaire.onrender.com/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"},
            body: JSON.stringify({name, email, password})
        })
        const data = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(data.error);
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem("user", JSON.stringify(data));

            // update the auth context
            dispatch({ type: "LOGIN", payload: data });

            setIsLoading(false);
        }
    }

    return { signup, isLoading, error };
}
