import "../styles/searchBar.css"

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = "Search..." }: SearchBarProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <>
      <input
        className="SearchBar"
        type="text"
        name="searchBar"
        id="searchBar"
        placeholder={placeholder}
        onChange={handleSearch}
      />
    </>
  );
}
