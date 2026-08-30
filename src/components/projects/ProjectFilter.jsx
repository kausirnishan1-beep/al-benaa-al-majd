export default function ProjectFilter({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      <button
        onClick={() => onChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium border ${active === 'all' ? 'bg-benaa text-white border-benaa' : 'border-gray-300 text-gray-600'}`}
      >
        الكل
      </button>
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`px-4 py-2 rounded-full text-sm font-medium border ${active === c ? 'bg-benaa text-white border-benaa' : 'border-gray-300 text-gray-600'}`}
        >
          {c}
        </button>
      ))}
    </div>
  )
}
