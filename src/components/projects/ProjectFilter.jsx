const categoryNames = {
  all: { en: 'All Projects', ar: 'جميع المشاريع' },
  construction: { en: 'Construction', ar: 'الإنشاءات' },
  renovation: { en: 'Renovation', ar: 'التجديد والترميم' },
  'import-export': { en: 'Import & Export', ar: 'الاستيراد والتصدير' },
  logistics: { en: 'Logistics', ar: 'اللوجستيات' },
}

export default function ProjectFilter({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      <button
        onClick={() => onChange('all')}
        className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold border transition-all ${
          active === 'all'
            ? 'bg-benaa text-white border-benaa shadow-md'
            : 'border-gray-200 text-gray-700 hover:border-benaa bg-white'
        }`}
      >
        <span>All</span> <span className="text-[11px] font-arabic font-normal opacity-80">(الكل)</span>
      </button>

      {categories.map((c) => {
        const meta = categoryNames[c] || { en: c, ar: c }
        return (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold border transition-all ${
              active === c
                ? 'bg-benaa text-white border-benaa shadow-md'
                : 'border-gray-200 text-gray-700 hover:border-benaa bg-white'
            }`}
          >
            <span>{meta.en}</span> <span className="text-[11px] font-arabic font-normal opacity-80">({meta.ar})</span>
          </button>
        )
      })}
    </div>
  )
}

