import { motion } from 'framer-motion'

export default function SectionTitle({
  eyebrow,
  eyebrowAr,
  title,
  titleAr,
  subtitle,
  subtitleAr,
  center = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={center ? 'text-center mb-12' : 'mb-12'}
    >
      {(eyebrow || eyebrowAr) && (
        <div className="flex items-center justify-center gap-2 mb-2">
          {eyebrow && (
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-majd">
              {eyebrow}
            </span>
          )}
          {eyebrow && eyebrowAr && <span className="text-gray-300">|</span>}
          {eyebrowAr && (
            <span className="text-xs md:text-sm font-semibold text-majd font-arabic">
              {eyebrowAr}
            </span>
          )}
        </div>
      )}

      {title && (
        <h2 className="text-3xl md:text-4xl font-extrabold text-benaa tracking-tight">
          {title}
        </h2>
      )}

      {titleAr && (
        <p className="text-xl md:text-2xl font-bold text-benaa/85 mt-1.5 font-arabic">
          {titleAr}
        </p>
      )}

      {subtitle && (
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-base leading-relaxed">
          {subtitle}
        </p>
      )}

      {subtitleAr && (
        <p className="text-gray-500 mt-1 max-w-2xl mx-auto text-sm font-arabic leading-relaxed">
          {subtitleAr}
        </p>
      )}
    </motion.div>
  )
}

