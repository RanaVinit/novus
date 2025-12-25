import { Search } from "lucide-react";

export default function SearchBar({ compact = false, className = "" }) {
  const container = compact
    ? "w-full"
    : "w-full max-w-2xl mx-auto px-4";

  const inputSize = compact
    ? "pl-12 pr-4 py-2.5 text-sm"
    : "pl-12 pr-4 py-3 text-base";

  return (
    <div className={`${container} ${className}`} role="search">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          aria-label="Search"
          type="text"
          placeholder="Search"
          className={`w-full bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-black/10 placeholder:text-gray-400 ${inputSize}`}
        />
      </div>
    </div>
  );
}