import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";
import { selectJobsByUserId } from "../redux/jobsSlice";

import JobsBoard from "../components/JobsBoard";
import JobCard from "../components/JobCard";

const Profile = () => {
    const user = useSelector(selectUser);

    const jobs = useSelector((state) => selectJobsByUserId(state, user.id));

    let jobsEl = jobs.map(job => (
        <JobCard key={job._id} job={job} />
    ))

    return (
        <div className="profile">
            <div className="profile__details">
                <h1 className="profile__name">Welcome, {user.name}!</h1>
                <h2 className="profile__title">Jobs</h2>
                <div className="jobs">
                    {
                        jobsEl
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile;