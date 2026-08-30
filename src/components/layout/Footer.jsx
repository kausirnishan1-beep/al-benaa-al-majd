import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Building2, ChevronRight, Clock } from 'lucide-react'
import Container from '../common/Container.jsx'
import { CONTACT_INFO } from '../../utils/constants.js'

export default function Footer() {
  return (
    <footer className="bg-benaa-dark text-white mt-auto border-t-2 border-majd/30">
      <Container className="py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-majd-light" />
            </div>
            <div>
              <h3 className="text-lg font-bold leading-tight">Al-Benaa & Al-Majd Group</h3>
              <p className="text-xs text-majd-light font-arabic">مجموعة البناء والمجد القابضة</p>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-2">
            Two leading specialized companies under one umbrella: General Construction & Contracting, and International Trading & Logistics in Saudi Arabia.
          </p>
          <p className="text-white/50 text-xs font-arabic leading-relaxed">
            شركتان رائدتان في مجالي الإنشاءات والمقاولات، والتجارة العامة والاستيراد والتصدير في المملكة العربية السعودية.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-base mb-1 text-white">Quick Links</h4>
          <p className="text-xs text-majd-light font-arabic mb-4">روابط سريعة</p>
          <ul className="space-y-3 text-white/75 text-sm">
            <li>
              <Link to="/about" className="hover:text-white flex items-center gap-2 transition-colors">
                <ChevronRight className="w-4 h-4 text-majd-light" />
                <span>About Us <span className="text-xs text-white/50 font-arabic">(من نحن)</span></span>
              </Link>
            </li>
            <li>
              <Link to="/companies" className="hover:text-white flex items-center gap-2 transition-colors">
                <ChevronRight className="w-4 h-4 text-majd-light" />
                <span>Our Companies <span className="text-xs text-white/50 font-arabic">(شركاتنا)</span></span>
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-white flex items-center gap-2 transition-colors">
                <ChevronRight className="w-4 h-4 text-majd-light" />
                <span>Projects Portfolio <span className="text-xs text-white/50 font-arabic">(المشاريع)</span></span>
              </Link>
            </li>
            <li>
              <Link to="/compliance" className="hover:text-white flex items-center gap-2 transition-colors">
                <ChevronRight className="w-4 h-4 text-majd-light" />
                <span>Compliance & Licenses <span className="text-xs text-white/50 font-arabic">(الالتزام والتراخيص)</span></span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white flex items-center gap-2 transition-colors">
                <ChevronRight className="w-4 h-4 text-majd-light" />
                <span>Contact Us <span className="text-xs text-white/50 font-arabic">(تواصل معنا)</span></span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-base mb-1 text-white">Contact & Headquarters</h4>
          <p className="text-xs text-majd-light font-arabic mb-4">معلومات الاتصال والمقر</p>
          <ul className="space-y-3 text-white/75 text-sm">
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-majd-light flex-shrink-0 mt-1" />
              <div>
                <span className="block font-medium" dir="ltr">{CONTACT_INFO.phone}</span>
                <span className="block text-xs text-white/50" dir="ltr">{CONTACT_INFO.phoneAlt}</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-majd-light flex-shrink-0 mt-1" />
              <span className="font-medium">{CONTACT_INFO.email}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-majd-light flex-shrink-0 mt-1" />
              <div>
                <span className="block font-medium">{CONTACT_INFO.addressEn}</span>
                <span className="block text-xs text-white/50 font-arabic mt-0.5">{CONTACT_INFO.addressAr}</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-majd-light flex-shrink-0 mt-1" />
              <div>
                <span className="block font-medium">{CONTACT_INFO.workingHoursEn}</span>
                <span className="block text-xs text-white/50 font-arabic mt-0.5">{CONTACT_INFO.workingHoursAr}</span>
              </div>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-5 text-center text-white/60 text-xs">
        <p>© {new Date().getFullYear()} Al-Benaa & Al-Majd Group. All rights reserved. | جميع الحقوق محفوظة لمجموعة البناء والمجد</p>
      </div>
    </footer>
  )
}


