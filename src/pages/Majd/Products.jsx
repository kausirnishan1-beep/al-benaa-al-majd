import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import { products } from '../../data/products.js'

export default function Products() {
  return (
    <section className="section-container">
      <Container>
        <SectionTitle eyebrow="شركة المجد" title="منتجاتنا" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="rounded-xl overflow-hidden shadow bg-white">
              <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-400">
                {p.name}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-majd">{p.name}</h3>
                <p className="text-sm text-gray-500 mt-2">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
