import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStatusUpdate, updatePassword, resetUpdateStatusAndError } from "../redux/authSlice";
import {useNavigate} from 'react-router-dom';
import validator from 'validator';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        password: '',
        newPassword: ''
    })

    function handleChange(e) {
        const {name, value} = e.target;

        setUser({
            ...user,
            [name]: value
        })
    }

    const [requestStatus, setRequestStatus] = useState('idle');

    const canSave = [user.password, user.newPassword].every(Boolean) && validator.isStrongPassword(user.newPassword) && requestStatus === 'idle';

    function handleSubmit(e) {
        e.preventDefault();

        if(canSave) {
            try {
                setRequestStatus('pending');
                dispatch(updatePassword({password: user.password, newPassword: user.newPassword}));
            } catch(err) {
                alert(err.message);
            } finally {
                setRequestStatus('idle');
            }
        }
    }

    const updateStatus = useSelector(getStatusUpdate);

    useEffect(() => {
        if(updateStatus === 'succeeded') {
            dispatch(resetUpdateStatusAndError());
            navigate('/');
        }
    }, [updateStatus, dispatch]);

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="settings">
            <h1 className="settings__title">Update password</h1>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={user.password} onChange={(e) => handleChange(e)} className="settings__input" />
            <label htmlFor="newPassword">New Password</label>
            <input type="password" id="newPassword" name="newPassword" style={{border: !user.newPassword ? '' : validator.isStrongPassword(user.newPassword) ? '.1rem solid green' : '.1rem solid red'}} value={user.newPassword} onChange={(e) => handleChange(e)} className="settings__input" />
            <button className="btn btn--update">Save</button>
        </form>
    )
}

export default UpdatePassword;