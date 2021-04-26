import { useState } from "react";

const SearchArea = ({ search }) => {
  const [searchTerm, setSearchTerm] = useState(""); //set search term
  /*handle change*/
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /*handle submit and herit search function*/
  const handleSubmit = (e) => {
    e.preventDefault();
    search(searchTerm.trim() || undefined);
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
        <button type="submit" onClick={handleSubmit}>
          Search!
        </button>
      </form>
    </div>
  );
};

export default SearchArea;
