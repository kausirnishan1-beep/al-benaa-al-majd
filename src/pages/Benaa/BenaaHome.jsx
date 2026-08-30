import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import { benaaServices } from '../../data/services.js'
import { Link } from 'react-router-dom'

export default function BenaaHome() {
  return (
    <>
      <section className="bg-benaa text-white py-24">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold">شركة البناء</h1>
          <p className="mt-4 text-white/80 max-w-xl">
            متخصصون في الإنشاءات، التجديد، الصيانة، وإدارة المشاريع.
          </p>
        </Container>
      </section>

      <section className="section-container">
        <Container>
          <SectionTitle eyebrow="خدماتنا" title="ماذا نقدم" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benaaServices.map((s) => (
              <Link key={s.id} to={s.path} className="block p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-benaa mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
