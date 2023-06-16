import { useState } from "react";
import { useSignup} from "../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, isLoading, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(name, email, password);
    }
    return (
        <div>
            <form className="signup" onSubmit={handleSubmit}>
            <h3>Registeer</h3>

                <label>Naam:</label>
                <input type="text"
                autoComplete="on"
                onChange={(e) => setName(e.target.value)} 
                value={name}
                />
                <label>E-mail:</label>
                <input type="text"
                autoComplete="on"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />
                <label>Wachtwoord:</label>
                <input type="password"
                autoComplete="on"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />

                <button disabled={isLoading}> {isLoading ? "Aan het laden..." : "Registeren"}</button>
                {error && <div className="error">{error}</div>}
            </form>
            <div className="link">
                <p>Heeft u al een account? <Link to="/login">Log in!</Link></p>
            </div>
        </div>
    )
}

export default Signup

