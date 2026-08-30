import Container from '../components/common/Container.jsx'
import SectionTitle from '../components/common/SectionTitle.jsx'

export default function About() {
  return (
    <section className="section-container">
      <Container>
        <SectionTitle eyebrow="من نحن" title="مجموعة البناء والمجد" />
        <div className="max-w-3xl mx-auto text-gray-600 leading-8 space-y-4">
          <p>
            مجموعة البناء والمجد هي كيان يضم شركتين متخصصتين: شركة البناء للإنشاءات والمقاولات،
            وشركة المجد للتجارة العامة والاستيراد والتصدير. نسعى لتقديم خدمات متكاملة بأعلى معايير
            الجودة والاحترافية.
          </p>
          <p>
            منذ تأسيسنا، عملنا على بناء سمعة قوية قائمة على الثقة والالتزام والجودة، ونفخر بشراكاتنا
            الممتدة محلياً ودولياً.
          </p>
        </div>
      </Container>
    </section>
  )
}
