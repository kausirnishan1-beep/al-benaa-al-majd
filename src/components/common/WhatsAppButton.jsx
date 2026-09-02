import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSettings } from '../../admin/hooks/useSettings.js'

export default function WhatsAppButton() {
  const { settings } = useSettings()
  const rawNumber = settings?.contact?.whatsapp || settings?.contact?.phoneAlt || settings?.contact?.phone || '966501234567'
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '') || '966501234567'

  const defaultMsg = encodeURIComponent('Hello, I would like to inquire about your services. / مرحباً، أود الاستفسار عن خدماتكم.')
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${defaultMsg}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0.95, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#20bd5a] transition-colors focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 group"
      aria-label="Chat on WhatsApp / تواصل عبر واتساب"
    >
      <MessageCircle className="w-6 h-6 fill-current flex-shrink-0" />
      <div className="hidden sm:flex flex-col text-left leading-tight">
        <span className="text-xs font-bold tracking-wide">WhatsApp</span>
        <span className="text-[10px] font-arabic opacity-90">تواصل عبر واتساب</span>
      </div>
    </motion.a>
  )
}
