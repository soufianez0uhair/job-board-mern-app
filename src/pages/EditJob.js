import {useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { selectJobById, editJob, deleteJob } from "../redux/jobsSlice";
import { useNavigate } from 'react-router-dom';

const EditJob = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const currentJob = useSelector((state) => selectJobById(state, id));

    const [job, setJob] = useState(currentJob);

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
                setRequestStatus('pending');
                dispatch(editJob(job));
            } catch(err) {
                console.log(err.message);
            } finally {
                setRequestStatus('idle');
                navigate('/');
            }
        }
    }

    function handleDelete() {
        if(requestStatus === 'idle') {
            try {
                setRequestStatus('pending');
                dispatch(deleteJob({_id: job._id}));
            } catch(err) {
                alert(err.message);
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
                <textarea type="text" rows="15" cols="50" id="description" name="description" value={job.description} onChange={(e) => handleChange(e)} className="jobForm__input"></textarea>
                <button className="btn btn--jobForm">Save</button>
                <button onClick={handleDelete} className="btn btn--delete">Delete</button>
            </form>
        </div>
    )
}

export default EditJob;