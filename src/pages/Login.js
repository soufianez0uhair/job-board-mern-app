import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStatusAuth, getErrorAuth, loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        const {name, value} = e.target;

        setUser({
            ...user,
            [name]: value
        })
    }

    const canSave = [user.email, user.password].every(Boolean);

    function handleSubmit(e) {
        e.preventDefault();

        if(canSave) {
            dispatch(loginUser(user));
        }
    }

    const authStatus = useSelector(getStatusAuth);
    const authError = useSelector(getErrorAuth);

    useEffect(() => {
        if(authStatus === 'succeeded') {
            navigate('/');
        }
    }, [authStatus, dispatch]);

    if(authStatus === 'loading') return <Loader />

    return (
        <div className="auth">
            <form onSubmit={(e) => handleSubmit(e)} className="auth__form">
                <h1 className="auth__title">Login</h1>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" value={user.email} onChange={(e) => handleChange(e)} className="auth__input" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={user.password} onChange={(e) => handleChange(e)} className="auth__input" />
                <button className="btn btn--auth">Login</button>
                {authError && <span className="auth__error">{authError}</span> }
            </form>
        </div>
    )
}

export default Login;