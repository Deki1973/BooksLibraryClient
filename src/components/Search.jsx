
import "@style/_Search.scss";


const Search = ({value, onChange, handleSearch,onKeyDown}) => {
    return (  
        <div className="search">
            <input type="text" value={value} onChange={onChange} onKeyDown={onKeyDown}/>
            <button onClick={handleSearch}>Trazi</button>
        </div>
    );
}
 

export default Search;