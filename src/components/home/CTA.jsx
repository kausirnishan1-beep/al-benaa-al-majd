import Container from '../common/Container.jsx'
import Button from '../common/Button.jsx'

export default function CTA() {
  return (
    <section className="section-container">
      <Container className="bg-majd rounded-2xl text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">هل لديك مشروع أو استفسار تجاري؟</h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          تواصل مع فريقنا اليوم وسنساعدك في تحقيق أهدافك.
        </p>
        <Button to="/contact" variant="primary" className="bg-white text-majd hover:bg-white/90">
          تواصل معنا
        </Button>
      </Container>
    </section>
  )
}
