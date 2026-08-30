import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'

export default function Maintenance() {
  return (
    <section className="section-container">
      <Container>
        <SectionTitle eyebrow="شركة البناء" title="الصيانة" />
        <div className="max-w-3xl mx-auto text-gray-600 leading-8">
          <p>تفاصيل خدمة الصيانة ستُضاف هنا. يمكن تخصيص هذا المحتوى لاحقاً بما يناسب نطاق العمل الفعلي.</p>
        </div>
      </Container>
    </section>
  )
}
