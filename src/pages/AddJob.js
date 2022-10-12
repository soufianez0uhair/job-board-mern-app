import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/authSlice";
import { addJob } from "../redux/jobsSlice";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id} = useSelector(selectUser);

    const [job, setJob] = useState({
        title: '',
        userId: id,
        company: '',
        description: ''
    })

    function handleChange(e) {
        const {name, value} = e.target;

        setJob({
            ...job,
            [name]: value
        })
    }

    const [requestStatus, setRequestStatus] = useState('idle');

    const canSave = [job.title, job.company, job.description].every(Boolean) && requestStatus === 'idle';

    function handleSubmit(e) {
        e.preventDefault();

        if(canSave) {
            try {
                dispatch(addJob(job));
                setRequestStatus('pending');
            } catch(err) {
                alert(err.message)
            } finally {
                setRequestStatus('idle');
                navigate('/');
            }
        }
    }

    return (
        <div className="jobForm">
            <form onSubmit={(e) => handleSubmit(e)} className="jobForm__form">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={job.title} onChange={(e) => handleChange(e)} className="jobForm__input" />
                <label htmlFor="company">Company</label>
                <input type="text" id="company" name="company" value={job.company} onChange={(e) => handleChange(e)} className="jobForm__input" />
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={job.description} onChange={(e) => handleChange(e)} rows="10" cols="40" className="jobForm__input" />
                <button className="btn btn--jobForm">Add</button>
            </form>
        </div>
        
    )
}

export default AddJob;