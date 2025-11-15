export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 z-50">
      <h1 className="text-2xl font-bold">Novus</h1>

      <ul className="hidden md:flex gap-8 text-gray-700">
        <li className="cursor-pointer hover:text-black">Home</li>
        <li className="cursor-pointer hover:text-black">Blogs</li>
        <li className="cursor-pointer hover:text-black">Categories</li>
      </ul>

      <button className="px-4 py-2 bg-black text-white rounded-lg">
        Login
      </button>
    </nav>
  );
}