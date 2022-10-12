import {AiOutlineSearch} from 'react-icons/ai';

const Search = ({term, handleTerm}) => {

    console.log(term);
    return (
        <div className="search">
            <h1 className="search__title">Looking for the next best <span>opportunity</span>?</h1>
            <form className="search__form">
                <input type="text" id="term" name="term" placeholder="Search.." value={term} onChange={(e) => handleTerm(e)} className="search__input" />
                <div className="icon--search-box">
                    <AiOutlineSearch className="icon icon--search" />
                </div>
            </form>
        </div>
    )
}

export default Search;