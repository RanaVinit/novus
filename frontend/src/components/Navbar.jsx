export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full border-b bg-white/90 backdrop-blur-md px-6 py-4 flex justify-between items-center z-50">
      <h1 className="text-2xl font-bold">Novus</h1>

      <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
        <li className="hover:text-black cursor-pointer">Home</li>
        <li className="hover:text-black cursor-pointer">Blogs</li>
        <li className="hover:text-black cursor-pointer">Categories</li>
        <li className="hover:text-black cursor-pointer">About</li>
      </ul>

      <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition">
        Login
      </button>
    </nav>
  );
}