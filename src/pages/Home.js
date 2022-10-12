import { useState } from 'react';

import Search from '../components/Search';
import JobsBoard from '../components/JobsBoard';

const Home = () => {
    const [term, setTerm] = useState('');

    function handleTerm(e) {
        const {name, value} = e.target;

        setTerm(value);
    }

    return (
        <div className="home">
            <Search term={term} handleTerm={handleTerm} />
            <h1 className="jobs__title">Jobs</h1>
            <JobsBoard term={term} />
        </div>
    )
}

export default Home;