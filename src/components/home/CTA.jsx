import { PhoneCall } from 'lucide-react'
import Container from '../common/Container.jsx'
import Button from '../common/Button.jsx'

export default function CTA() {
  return (
    <section className="section-container py-16">
      <Container className="bg-gradient-to-r from-benaa via-benaa-dark to-majd-dark rounded-3xl text-white text-center py-16 px-6 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">
            Have a Construction Project or Trade Inquiry?
          </h2>
          <p className="text-xl md:text-2xl font-bold text-majd-light font-arabic mb-4">
            هل لديك مشروع إنشائي أو استفسار تجاري واستيراد؟
          </p>

          <p className="text-white/85 text-sm md:text-base mb-2 max-w-xl mx-auto leading-relaxed">
            Connect with our engineering and procurement consultants today for customized quotations and expert guidance across Saudi Arabia.
          </p>
          <p className="text-white/60 text-xs md:text-sm font-arabic mb-8 max-w-xl mx-auto leading-relaxed">
            تواصل مع مستشارينا اليوم للحصول على عروض أسعار مخصصة واستشارات هندسية وتجارية متكاملة.
          </p>

          <Button
            to="/contact"
            variant="primary"
            className="bg-white text-benaa hover:bg-gray-100 font-bold px-8 py-3.5 shadow-lg inline-flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-benaa" />
            <div className="text-left">
              <span className="block leading-tight">Request Consultation</span>
              <span className="block text-[10px] text-gray-500 font-arabic leading-tight">طلب استشارة وعرض سعر</span>
            </div>
          </Button>
        </div>
      </Container>
    </section>
  )
}

