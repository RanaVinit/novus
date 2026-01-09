import { Search } from "lucide-react";

export default function SearchBar({ compact = false, className = "", value, onChange }) {
  const container = compact
    ? "w-full"
    : "w-full max-w-2xl mx-auto px-4";

  const inputSize = compact
    ? "pl-12 pr-4 py-2.5 text-sm"
    : "pl-12 pr-4 py-3 text-base";

  return (
    <div className={`${container} ${className}`} role="search">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
        <input
          aria-label="Search"
          type="text"
          placeholder="Search"
          value={value}
          onChange={onChange}
          className={`w-full bg-gray-100 rounded-full focus:outline-none focus:ring-black/10 placeholder:text-gray-600 ${inputSize}`}
        />
      </div>
    </div>
  );
}