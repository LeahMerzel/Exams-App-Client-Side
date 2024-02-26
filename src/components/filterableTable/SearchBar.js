function SearchBar({ filterText, setFilterText }) {
    return (
      <form>
        <input
          type="text"
          value={filterText}
          placeholder="Search..."
          onChange={(e) => setFilterText(e.target.value)}
        />
      </form>
    );
  }
  
  export default SearchBar;

