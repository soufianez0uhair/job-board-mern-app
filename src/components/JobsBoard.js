import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllJobs, getStatusJobs, getErrorJobs, fetchJobs } from "../redux/jobsSlice";
import JobCard from "./JobCard";
import Loader from "./Loader";

const JobsBoard = ({term}) => {
    const dispatch = useDispatch();

    const jobs = useSelector(selectAllJobs);
    const jobsStatus = useSelector(getStatusJobs);
    const jobsError = useSelector(getErrorJobs);

    useEffect(() => {
        if(jobsStatus === 'idle') {
            dispatch(fetchJobs())
        }
    }, [jobsStatus, dispatch]);

    let jobsEl = '';
    if(jobsStatus === 'loading') {
        jobsEl = <Loader />
    } else if(jobsStatus === 'succeeded') {
        const filteredJobs = term && jobs.filter(job => job.title.indexOf(term) !== -1 || job.title.indexOf(term.toUpperCase()) !== -1 || job.title.indexOf(term[0].toUpperCase() + term.slice(1, term.length)) !== -1);
        jobsEl = term ? filteredJobs.map(job => (
            <JobCard key={job._id} job={job} />
        )) : jobs.map(job => (
            <JobCard key={job._id} job={job} />
        ))
    } else if(jobsStatus === 'failed') {
        jobsEl = jobsError;
    }

    return (
        <div className="jobs">
            {
                jobsEl
            }
        </div>
    )
}

export default JobsBoard;