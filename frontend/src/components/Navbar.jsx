import { SquarePen } from 'lucide-react';

export default function Navbar({ showPublish, hideNav }) {
  return (
    <nav className="w-full border-b bg-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 z-50">
      <a href="/" className="text-2xl font-bold">Novus</a>

      { !hideNav && (
      <ul className="hidden md:flex gap-8 text-gray-700">
        <li className="cursor-pointer hover:text-black">Home</li>
        <li className="cursor-pointer hover:text-black">Blogs</li>
        <li className="cursor-pointer hover:text-black">Categories</li>
      </ul>
      )}

      <div>
        {showPublish ? (
          <button
            type="submit"
            form="createBlogForm"
            className="bg-green-700 text-white rounded-2xl hover:bg-green-800 transition px-2 py-0.4 mr-7.5"
          >
            Publish
          </button>
        ) : (
          <a
            href="/create-blog"
            className="text-black px-4 py-2 rounded-lg mr-4.5"
          >
            <SquarePen className="inline-block w-6   h-6 mr-1 pb-1" />
            Write
          </a>
        )}

        <button className="px-4 py-2 bg-black text-white rounded-lg">
          Login
        </button>
      </div>
    </nav>
  );
}
