import { Phone, Mail, MapPin, Clock, Building2 } from 'lucide-react'
import { CONTACT_INFO } from '../../utils/constants.js'

export default function ContactInfo() {
  return (
    <div className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h3 className="text-xl font-extrabold text-benaa tracking-tight">Corporate Headquarters</h3>
        <p className="text-sm font-bold text-majd font-arabic">المقر الرئيسي ومعلومات الاتصال</p>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-benaa/10 text-benaa flex items-center justify-center flex-shrink-0">
          <Phone className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-sm">Direct Phone & WhatsApp</h4>
          <p className="text-xs text-gray-500 font-arabic">الهاتف والواتساب المباشر</p>
          <p className="text-gray-700 font-semibold text-sm mt-1" dir="ltr">{CONTACT_INFO.phone}</p>
          <p className="text-gray-500 text-xs mt-0.5" dir="ltr">{CONTACT_INFO.phoneAlt}</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-benaa/10 text-benaa flex items-center justify-center flex-shrink-0">
          <Mail className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-sm">Official Email</h4>
          <p className="text-xs text-gray-500 font-arabic">البريد الإلكتروني الرسمي</p>
          <p className="text-gray-700 font-semibold text-sm mt-1">{CONTACT_INFO.email}</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-benaa/10 text-benaa flex items-center justify-center flex-shrink-0">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-sm">Head Office Location</h4>
          <p className="text-xs text-gray-500 font-arabic">عنوان المقر الرئيسي</p>
          <p className="text-gray-700 text-sm mt-1">{CONTACT_INFO.addressEn}</p>
          <p className="text-gray-500 text-xs font-arabic mt-0.5">{CONTACT_INFO.addressAr}</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-benaa/10 text-benaa flex items-center justify-center flex-shrink-0">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-sm">Business Working Hours</h4>
          <p className="text-xs text-gray-500 font-arabic">ساعات العمل الرسمية</p>
          <p className="text-gray-700 text-sm mt-1">{CONTACT_INFO.workingHoursEn}</p>
          <p className="text-gray-500 text-xs font-arabic mt-0.5">{CONTACT_INFO.workingHoursAr}</p>
        </div>
      </div>
    </div>
  )
}

