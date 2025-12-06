export function MetaBadge({ icon, text }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
      {icon}
      {text}
    </span>
  );
}

export default function CategoryTag({ label }) {
  return (
    <button className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition">
      {label}
    </button>
  );
}