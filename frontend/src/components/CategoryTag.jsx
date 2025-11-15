export default function CategoryTag({ label }) {
  return (
    <button className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition">
      {label}
    </button>
  );
}