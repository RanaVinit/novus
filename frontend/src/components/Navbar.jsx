function Navbar({ brand }) {
  return (
    <nav className="bg-black shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl text-white">{brand}</h1>
      <div className="space-x-4 mr-15">
        <a href="#" className="text-white">Home</a>
        <a href="#" className="text-white">About</a>
        <a href="#" className="text-white ">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;