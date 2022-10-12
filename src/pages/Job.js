import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectJobById } from "../redux/jobsSlice";
import { USERS_API } from "../Api";

const Job = () => {
    const {id} = useParams();

    const job = useSelector((state) => selectJobById(state, id));

    const [userName, setUserName] = useState('');

    useEffect(() => {
        fetch(`${USERS_API}/${job.userId}`)
            .then(res => res.json())
            .then(data => setUserName(data.data.name))
            .catch(err => console.log(err.message))
    }, []);

    return (
        <div className="job">
            <div className="job__details">
                <h1 className="job__title">{`${job.title} - ${job.company}`}</h1>
                <h3 className="job__author">Published By: {userName}</h3>
                <p className="job__description">{job.description}</p>
            </div>
        </div>
    )
}

export default Job;