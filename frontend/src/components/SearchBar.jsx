export default function SearchBar() {
  return (
    <div className="w-full max-w-xl mx-auto mt-5 px-4">
      <div className="relative">
        <input
          aria-label="Search articles"
          type="text"
          placeholder="Search for articles..."
          className="w-full pl-4 pr-4 py-3 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition text-sm md:text-base"
        />

        <button
          type="button"
          aria-label="Submit search"
          className=" focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          {/* icon/text */}
        </button>
      </div>
    </div>
  );
}