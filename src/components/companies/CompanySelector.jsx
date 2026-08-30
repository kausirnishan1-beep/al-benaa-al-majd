import { Link } from 'react-router-dom'
import { companies } from '../../data/companies.js'

export default function CompanySelector({ active }) {
  return (
    <div className="flex justify-center gap-4 mb-10">
      {companies.map((c) => (
        <Link
          key={c.id}
          to={c.path}
          className={`px-6 py-2 rounded-full font-semibold border-2 transition-colors ${
            active === c.id
              ? `bg-${c.color} text-white border-${c.color}`
              : 'text-gray-600 border-gray-300 hover:border-gray-400'
          }`}
        >
          {c.name}
        </Link>
      ))}
    </div>
  )
}
