import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import TuneIcon from "@mui/icons-material/Tune";

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // "newest" or "oldest"

  // Debounce search to avoid too many updates
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (onSearch) {
        // Search will now match against the searchKey which includes title-id
        onSearch(searchQuery, sortOrder);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, sortOrder, onSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery, sortOrder);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    // The search query will be matched against the searchKey (title-id)
    setSearchQuery(value);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

  return (
    <div className="w-full h-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-2">
      <div className="max-w-5xl mx-auto h-full">
        <div className="flex gap-4 items-center h-full">
          {/* Search Input */}
          <form onSubmit={handleSearch} className="flex-1 h-full">
            <div className="relative group h-full flex flex-col gap-2">
              {/* First Search Input */}
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder="Search Prompt by title or ID..."
                  className="w-full h-10 bg-white/90 backdrop-blur-sm rounded-xl pl-12 pr-4 shadow-lg hover:shadow-xl focus:shadow-xl outline-none border-2 border-gray-100 focus:border-purple-200 transition-all duration-300 text-gray-800 placeholder-gray-400"
                  autoComplete="off"
                  title="Search by Prompt title or ID"
                  aria-label="Search Prompt by title or ID"
                />
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>
          </form>

          {/* Sort Button */}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
