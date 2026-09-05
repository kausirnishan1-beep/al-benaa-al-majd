import { lazy, Suspense } from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { CONTACT_INFO } from '../../utils/constants.js'
import { useSettings } from '../../admin/hooks/useSettings.js'

const Contact3DPin = lazy(() => import('../3d/Contact3DPin.jsx'))

export default function ContactInfo() {
  const { settings } = useSettings()
  const contact = settings?.contact || CONTACT_INFO

  return (
    <div className="space-y-6 bg-white p-5 sm:p-8 rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
      {/* 3D Location Beacon */}
      <div className="w-full h-48 sm:h-56 md:h-60 rounded-2xl bg-gradient-to-br from-[#021812] via-[#06241b] to-[#041320] relative overflow-hidden flex items-center justify-center border border-white/10 shadow-inner">
        <Suspense
          fallback={
            <div className="text-white/40 text-xs animate-pulse">Loading 3D Headquarters...</div>
          }
        >
          <Contact3DPin />
        </Suspense>
      </div>

      <div className="border-b border-gray-100 pb-4 mb-4">
        <h3 className="text-lg sm:text-xl font-extrabold text-benaa tracking-tight">Corporate Headquarters</h3>
        <p className="text-xs sm:text-sm font-bold text-majd font-arabic">المقر الرئيسي ومعلومات الاتصال</p>
      </div>

      <div className="flex items-start gap-3.5 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-benaa/10 text-benaa flex items-center justify-center flex-shrink-0">
          <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-xs sm:text-sm">Direct Phone & WhatsApp</h4>
          <p className="text-[11px] sm:text-xs text-gray-500 font-arabic">الهاتف والواتساب المباشر</p>
          <p className="text-gray-700 font-semibold text-xs sm:text-sm mt-1" dir="ltr">{contact.phone || CONTACT_INFO.phone}</p>
          <p className="text-gray-500 text-[11px] sm:text-xs mt-0.5" dir="ltr">{contact.phoneAlt || CONTACT_INFO.phoneAlt}</p>
        </div>
      </div>

      <div className="flex items-start gap-3.5 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-benaa/10 text-benaa flex items-center justify-center flex-shrink-0">
          <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-xs sm:text-sm">Official Email</h4>
          <p className="text-[11px] sm:text-xs text-gray-500 font-arabic">البريد الإلكتروني الرسمي</p>
          <p className="text-gray-700 font-semibold text-xs sm:text-sm mt-1 break-all">{contact.email || CONTACT_INFO.email}</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-benaa/10 text-benaa flex items-center justify-center flex-shrink-0">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-sm">Head Office Location</h4>
          <p className="text-xs text-gray-500 font-arabic">عنوان المقر الرئيسي</p>
          <p className="text-gray-700 text-sm mt-1">{contact.addressEn || CONTACT_INFO.addressEn}</p>
          <p className="text-gray-500 text-xs font-arabic mt-0.5">{contact.addressAr || CONTACT_INFO.addressAr}</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-benaa/10 text-benaa flex items-center justify-center flex-shrink-0">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-sm">Business Working Hours</h4>
          <p className="text-xs text-gray-500 font-arabic">ساعات العمل الرسمية</p>
          <p className="text-gray-700 text-sm mt-1">{contact.workingHoursEn || CONTACT_INFO.workingHoursEn}</p>
          <p className="text-gray-500 text-xs font-arabic mt-0.5">{contact.workingHoursAr || CONTACT_INFO.workingHoursAr}</p>
        </div>
      </div>
    </div>
  )
}


