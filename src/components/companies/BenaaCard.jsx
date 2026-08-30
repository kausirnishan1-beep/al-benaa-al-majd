import { motion } from 'framer-motion'
import { Building2, ArrowRight } from 'lucide-react'
import Button from '../common/Button.jsx'

export default function BenaaCard({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl overflow-hidden shadow-lg border-t-4 border-benaa bg-white hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="p-8 md:p-10 flex flex-col flex-grow">
        <div className="w-14 h-14 rounded-2xl bg-benaa/10 text-benaa flex items-center justify-center mb-6">
          <Building2 className="w-8 h-8" />
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-benaa tracking-tight">
          {data.name}
        </h3>
        <p className="text-lg font-bold text-benaa/80 mt-1 font-arabic">
          {data.nameAr}
        </p>

        <div className="mt-4 p-3 bg-benaa/5 rounded-xl border border-benaa/10">
          <p className="text-xs font-semibold text-benaa uppercase tracking-wider">{data.tagline}</p>
          <p className="text-xs text-gray-600 font-arabic mt-0.5">{data.taglineAr}</p>
        </div>

        <p className="text-gray-600 mt-4 text-sm leading-relaxed flex-grow">
          {data.description}
        </p>
        <p className="text-gray-500 mt-2 text-xs font-arabic leading-relaxed">
          {data.descriptionAr}
        </p>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <Button
            to={data.path}
            variant="primary"
            className="w-full justify-center py-3.5 bg-benaa hover:bg-benaa-light text-white font-bold text-sm shadow-md"
          >
            <div className="flex items-center justify-center gap-2">
              <span>Explore Construction Division</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

