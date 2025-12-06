import { Link } from "react-router-dom";

export default function AuthNavbar() {
  return (
    <div className="w-full flex justify-center py-6">
      <Link to="/" className="text-3xl font-bold tracking-tight hover:opacity-80 transition">
        Novus
      </Link>
    </div>
  );
}