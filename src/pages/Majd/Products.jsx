import { ArrowUpRight } from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'
import OptimizedImage from '../../components/common/OptimizedImage.jsx'
import SEO from '../../components/common/SEO.jsx'
import { useProducts } from '../../admin/hooks/useProducts.js'

export default function Products() {
  const { products } = useProducts()
  const activeProducts = products.filter((p) => p.isActive !== false)

  return (
    <div className="py-16 md:py-24">
      <SEO
        title="Products Catalog & Materials | AL MAJD"
        description="Certified construction materials, machinery, and equipment catalog imported and supplied by AL MAJD LINES FOR TRADE & IMPORT in Saudi Arabia."
        canonicalPath="/majd/products"
      />
      <Container>
        <SectionTitle
          as="h1"
          eyebrow="AL MAJD LINES FOR TRADE & IMPORT"
          eyebrowAr="كتالوج منتجات مؤسسة خطوط المجد للتجارة والاستيراد"
          title="Certified Construction Materials & Equipment"
          titleAr="المواد والمعدات والمنتجات الإنشائية المعتمدة"
          subtitle="Directly imported, certified building products supplied to project sites across Saudi Arabia."
          subtitleAr="مستوردة مباشرة ومطابقة للمواصفات القياسية السعودية ومعتمدة للمشاريع الإنشائية."
        />

        {activeProducts.length === 0 ? (
          <div className="py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200 mt-10">
            <p className="text-gray-600 font-bold text-sm">No products currently listed in the catalog.</p>
            <p className="text-gray-400 text-xs font-arabic mt-1">لا توجد منتجات مضافة حالياً في الكتالوج.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {activeProducts.map((p) => (
            <div
              key={p.id}
              className="rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 flex flex-col group"
            >
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <OptimizedImage
                  src={p.image}
                  alt={p.name}
                  aspectRatio="16/9"
                  className="group-hover:scale-105 transition-transform duration-500"
                  fallbackText={p.name}
                />
                <div className="absolute top-3 right-3 bg-majd text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow tracking-tight z-10">
                  AL MAJD LINES
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-extrabold text-majd-dark text-base group-hover:text-benaa transition-colors leading-snug">
                  {p.name}
                </h3>
                {p.nameAr && (
                  <p className="font-bold text-xs text-gray-700 font-arabic mt-1">
                    {p.nameAr}
                  </p>
                )}
                <p className="text-xs text-gray-600 mt-3 leading-relaxed flex-grow">
                  {p.description}
                </p>
                {p.descriptionAr && (
                  <p className="text-[11px] text-gray-500 font-arabic mt-1 leading-relaxed">
                    {p.descriptionAr}
                  </p>
                )}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="capitalize font-medium">{p.category.replace('-', ' ')}</span>
                  <span className="text-majd-dark font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Inquire <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        <div className="mt-14 p-8 bg-majd/5 border border-majd/20 rounded-3xl text-center max-w-3xl mx-auto">
          <h4 className="font-extrabold text-majd-dark text-lg mb-1">Looking for a custom product or bulk material import?</h4>
          <p className="text-xs text-gray-600 font-arabic mb-4">هل تبحث عن توريد منتج خاص أو كميات كبرى من مصانع معينة؟</p>
          <Button to="/contact" variant="secondary" className="bg-majd text-white">
            Request Bulk Quotation / طلب تسعير كميات
          </Button>
        </div>
      </Container>
    </div>
  )
}


