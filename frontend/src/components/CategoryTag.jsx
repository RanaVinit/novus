export function MetaBadge({ icon, text }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
      {icon}
      {text}
    </span>
  );
}

export default function CategoryTag({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200
        ${isActive
          ? "bg-black text-white border-black shadow-md"
          : "bg-white border border-gray-200 text-gray-700 hover:border-black hover:shadow-md hover:bg-gray-50"
        }`}
    >
      {label}
    </button>
  );
}