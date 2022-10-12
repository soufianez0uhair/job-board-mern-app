import { useState, useEffect } from "react";
import validator from 'validator';
import { useSelector, useDispatch } from "react-redux";
import { getStatusAuth, getErrorAuth, registerUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

import Loader from "../components/Loader";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    function handleChange(e) {
        const {name, value} = e.target;

        setUser({
            ...user,
            [name]: value
        })
    }

    const canSave = [user.name, user.email, user.password, user.password2].every(Boolean) && user.password === user.password2 && validator.isEmail(user.email);

    const authStatus = useSelector(getStatusAuth);
    const authError = useSelector(getErrorAuth);

    function handleSubmit(e) {
        e.preventDefault();

        if(canSave) {
            dispatch(registerUser({name: user.name, email: user.email, password: user.password}));
        }
    }

    useEffect(() => {
        if(authStatus === 'succeeded') {
            navigate('/');
        }
    }, [authStatus, dispatch]);

    if(authStatus === 'loading') {
        return <Loader />
    }
    
    return (
        <div className="auth">
            <form onSubmit={(e) => handleSubmit(e)} className="auth__form">
                <h1 className="auth__title">Register</h1>
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" value={user.name} onChange={(e) => handleChange(e)} className="auth__input" />
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" value={user.email} onChange={(e) => handleChange(e)} className="auth__input" />
                <label htmlFor="password">password</label>
                <input type="password" id="password" name="password" value={user.password} onChange={(e) => handleChange(e)} className="auth__input" />
                <label htmlFor="password2">Confirm Password</label>
                <input type="password" id="password2" name="password2" value={user.password2} onChange={(e) => handleChange(e)} className="auth__input" />
                <button className="btn btn--auth">Register</button>
                {authError && <span className="auth__error">{authError}</span> }
            </form>
        </div>
    )
}

export default Register;