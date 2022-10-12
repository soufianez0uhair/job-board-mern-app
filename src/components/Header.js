import Logo from '../assets/logo.png';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logOut } from '../redux/authSlice';
import {IoMdSettings} from 'react-icons/io';

const Header = ({term, handleTerm}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(selectUser);

    function handleLogOut() {
        dispatch(logOut());
        navigate('/');
    }

    return (
        <header className="header">
            <Link to="/"><img src={Logo} alt="logo png" className="logo" /></Link>
            {!user ? <div className="header__links">
                <Link to="/login" className="header__link">Login</Link>
                <Link to="/register" className="header__link">Register</Link>
            </div> : <div className="header__links">
                <Link to="/add" className="header__link">+ Publish a job offer</Link>
                <Link to="/profile" className="header__link">{user.name}</Link>
                <Link to="/settings" ><IoMdSettings className="icon icon--settings" /></Link>
                <span onClick={handleLogOut} className="header__link">Logout</span>
            </div> }
        </header>
    )
}

export default Header;