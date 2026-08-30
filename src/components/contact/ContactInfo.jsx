import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { CONTACT_INFO } from '../../utils/constants.js'

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-benaa/10 text-benaa flex items-center justify-center flex-shrink-0">
          <Phone className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-benaa mb-1">الهاتف</h4>
          <p className="text-gray-600" dir="ltr">{CONTACT_INFO.phone}</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-benaa/10 text-benaa flex items-center justify-center flex-shrink-0">
          <Mail className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-benaa mb-1">البريد الإلكتروني</h4>
          <p className="text-gray-600">{CONTACT_INFO.email}</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-benaa/10 text-benaa flex items-center justify-center flex-shrink-0">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-benaa mb-1">العنوان</h4>
          <p className="text-gray-600">{CONTACT_INFO.address}</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-benaa/10 text-benaa flex items-center justify-center flex-shrink-0">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-benaa mb-1">أوقات العمل</h4>
          <p className="text-gray-600">الأحد - الخميس: 9:00 ص - 5:00 م</p>
        </div>
      </div>
    </div>
  )
}
