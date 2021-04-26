import { useState } from "react";

const SearchArea = ({ search }) => {
  const [searchTerm, setSearchTerm] = useState(""); //set search term
  const [maxResults, setMaxResults] = useState(10); //set Max results

  /*handle change*/
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /*handle submit and herit search function*/
  const handleSubmit = (e) => {
    e.preventDefault();
    search(searchTerm.trim() || undefined, maxResults);
    setSearchTerm(searchTerm.trim());
  };

  return (
    <div>
      <form>
        <input
          type="text"
          label="Search Term"
          value={searchTerm}
          onChange={handleChange}
        />

        <label for="maxResults">{maxResults}</label>
        <input
          type="range"
          min="1"
          max="40"
          id="maxResults"
          placeholder="Max Results"
          value={maxResults}
          onChange={(e) => setMaxResults(e.target.value)}
        />

        <button type="submit" onClick={handleSubmit}>
          Search!
        </button>
      </form>
    </div>
  );
};

export default SearchArea;
