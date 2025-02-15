import { useState } from "react";
import { Search } from "lucide-react";
import TuneIcon from "@mui/icons-material/Tune";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="h-10 mt-3 ml-2 mr-2 text-gray-900 p-4">
      <div className="flex justify-between items-center">
        {/* Search Input */}
        <form onSubmit={handleSearch} className="relative flex-grow">
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gray-700 transition-colors duration-200"
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anything..."
              className="w-full bg-white rounded-full pl-12 pr-4 py-3 shadow-md focus:shadow-lg outline-none border border-gray-300 focus:border-gray-200 transition-all duration-200 text-gray-900 placeholder-gray-500 h-10"
            />
          </div>
        </form>

        {/* Sort Button */}
        <button className="ml-4 flex items-center text-gray-700 h-10 bg-white px-4 py-2 rounded-full shadow hover:bg-gray-200 transition-all duration-200">
          <TuneIcon className="mr-2" />
          Sort
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
