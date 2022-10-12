import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { USERS_API } from '../Api';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/authSlice';
import {AiFillEdit} from 'react-icons/ai';

const JobCard = ({job}) => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        fetch(`${USERS_API}/${job.userId}`)
            .then(res => res.json())
            .then(data => setUserName(data.data.name))
            .catch(err => console.log(err.message))
    }, []);

    const user = useSelector(selectUser);

    const id = (user && user.id) || null;

    return (
        <div className="jobCard">
            <span className="jobCard__company">{job.company}</span>
            <div className="jobCard__details">
                <h2 className="jobCard__title">{job.title.length > 20 ? job.title.slice(0, 20) + '..' : job.title}</h2>
                <span className="jobCard__author">{userName}</span>
                <span className="jobCard__description">{job.description.slice(0,80) + '..'}</span>
                <Link to={`/job/view/${job._id}`} className="jobCard__link">view job</Link>
                {id && job.userId === id && <Link to={`job/edit/${job._id}`} ><AiFillEdit className="icon icon--edit" /></Link>}
            </div>
        </div>
    )
}

export default JobCard;