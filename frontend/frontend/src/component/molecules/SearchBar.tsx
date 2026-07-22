import "./SearchBar.css";
interface SearchBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const SearchBar = ({ search, setSearch, setCurrentPage }: SearchBarProps) => {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="🔍 Search employee..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default SearchBar;
