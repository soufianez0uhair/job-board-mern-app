import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getErrorAuth, getStatusUpdate, updateEmail, resetUpdateStatus} from '../redux/authSlice';
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        const {name, value} = e.target;

        setUser({
            ...user,
            [name]: value
        })
    }

    const [requestStatus, setRequeststatus] = useState('idle');

    const canSave = [user.email, user.password].every(Boolean) && requestStatus === 'idle';

    const authError = useSelector(getErrorAuth);

    const [error, setError] = useState(authError);

    function handleSubmit(e) {
        e.preventDefault();

        if(canSave) {
            try {
                setRequeststatus('pending');
                dispatch(updateEmail(user));
                setError('');
            } catch(err) {
                setError(err.message);
            } finally {
                setRequeststatus('idle');
            }
        }
    }

    useEffect(() => {
        setError(authError);
    }, [authError]);

    const updateStatus = useSelector(getStatusUpdate);

    useEffect(() => {
        if(updateStatus === 'succeeded') {
            navigate('/');
        }
        dispatch(resetUpdateStatus());
    }, [updateStatus, dispatch]);
    

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="settings">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" value={user.email} onChange={(e) => handleChange(e)} className="settings__input" />
            <label htmlFor="password">Confirm Password</label>
            <input type="password" id="password" name="password" value={user.password} onChange={(e) => handleChange(e)} className="settings__input" />
            <button className="btn btn--update">Save</button>
            {error && <span className="settings__error">{error}</span>}
        </form>
    )
}

export default Settings;