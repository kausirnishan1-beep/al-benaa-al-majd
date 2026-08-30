import { motion } from 'framer-motion'
import { Globe2, ArrowRight } from 'lucide-react'
import Button from '../common/Button.jsx'

export default function MajdCard({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-3xl overflow-hidden shadow-lg border-t-4 border-majd bg-white hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="p-8 md:p-10 flex flex-col flex-grow">
        <div className="w-14 h-14 rounded-2xl bg-majd/10 text-majd flex items-center justify-center mb-6">
          <Globe2 className="w-8 h-8" />
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-majd-dark tracking-tight">
          {data.name}
        </h3>
        <p className="text-lg font-bold text-majd mt-1 font-arabic">
          {data.nameAr}
        </p>

        <div className="mt-4 p-3 bg-majd/5 rounded-xl border border-majd/10">
          <p className="text-xs font-semibold text-majd-dark uppercase tracking-wider">{data.tagline}</p>
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
            variant="secondary"
            className="w-full justify-center py-3.5 bg-majd hover:bg-majd-light text-white font-bold text-sm shadow-md"
          >
            <div className="flex items-center justify-center gap-2">
              <span>Explore Trading & Logistics</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

