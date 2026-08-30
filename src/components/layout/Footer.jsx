import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Building2, ChevronLeft } from 'lucide-react'
import Container from '../common/Container.jsx'
import { CONTACT_INFO } from '../../utils/constants.js'

export default function Footer() {
  return (
    <footer className="bg-benaa-dark text-white mt-auto">
      <Container className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-majd-light" />
            </div>
            <h3 className="text-lg font-bold">مجموعة البناء والمجد</h3>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            شركتان رائدتان في مجالي الإنشاءات والتجارة، نقدم حلولاً متكاملة بأعلى معايير الجودة والاحترافية في الشرق الأوسط.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-majd-light">روابط سريعة</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li>
              <Link to="/about" className="hover:text-white flex items-center gap-1.5 transition-colors">
                <ChevronLeft className="w-4 h-4 text-majd-light" /> من نحن
              </Link>
            </li>
            <li>
              <Link to="/companies" className="hover:text-white flex items-center gap-1.5 transition-colors">
                <ChevronLeft className="w-4 h-4 text-majd-light" /> شركاتنا
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-white flex items-center gap-1.5 transition-colors">
                <ChevronLeft className="w-4 h-4 text-majd-light" /> المشاريع
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white flex items-center gap-1.5 transition-colors">
                <ChevronLeft className="w-4 h-4 text-majd-light" /> تواصل معنا
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-majd-light">معلومات التواصل</h4>
          <ul className="space-y-3 text-white/70 text-sm">
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-majd-light flex-shrink-0" />
              <span dir="ltr">{CONTACT_INFO.phone}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-majd-light flex-shrink-0" />
              <span>{CONTACT_INFO.email}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-majd-light flex-shrink-0" />
              <span>{CONTACT_INFO.address}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-4 text-center text-white/50 text-xs">
        © {new Date().getFullYear()} Al-Benaa & Al-Majd Group. All rights reserved.
      </div>
    </footer>
  )
}

