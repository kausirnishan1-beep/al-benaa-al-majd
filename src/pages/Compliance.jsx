import Container from '../components/common/Container.jsx'
import SectionTitle from '../components/common/SectionTitle.jsx'

const items = [
  { title: 'ملف الشركة', desc: 'تحميل ملف تعريفي شامل عن المجموعة.', file: '/documents/company-profile.pdf' },
]

export default function Compliance() {
  return (
    <section className="section-container">
      <Container>
        <SectionTitle eyebrow="الالتزام" title="الشهادات والتراخيص" />
        <div className="max-w-2xl mx-auto space-y-4">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.file}
              target="_blank"
              rel="noreferrer"
              className="block p-6 border rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold text-benaa">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
