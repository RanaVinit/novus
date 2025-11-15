export default function SearchBar() {
  return (
    <div className="w-full max-w-xl mx-auto mt-5 px-4">
      <div className="relative">
        
        <input type="text" placeholder="Search for blogs..." className="w-full pl-4 pr-4 py-3 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition text-sm md:text-base"/>

      </div>
    </div>
  );
}