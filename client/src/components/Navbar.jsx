import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const NavBar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <img src="https://www.dyflexis.com/wp-content/uploads/2019/04/logo-dyflexis-2.svg" alt='logo' className='logo'/>
                </Link>
                <nav>
                    {user && (
                    <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Uitloggen</button>
                    </div>
                    )}
                    {!user && (
                    <div>
                        <Link to="/login">Inloggen</Link>
                        <Link to="/signup">Registreren</Link>
                    </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default NavBar;