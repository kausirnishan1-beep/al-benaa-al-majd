import { Link } from 'react-router-dom'
import { companies } from '../../data/companies.js'

export default function CompanySelector({ active }) {
  return (
    <div className="flex justify-center gap-4 mb-10">
      {companies.map((c) => (
        <Link
          key={c.id}
          to={c.path}
          className={`px-6 py-2.5 rounded-full font-bold text-sm border-2 transition-all ${
            active === c.id
              ? 'bg-benaa text-white border-benaa shadow-md'
              : 'text-gray-700 border-gray-200 hover:border-benaa bg-white'
          }`}
        >
          <span>{c.name}</span>
          <span className="text-xs font-arabic opacity-80 block text-center font-normal">{c.nameAr}</span>
        </Link>
      ))}
    </div>
  )
}

