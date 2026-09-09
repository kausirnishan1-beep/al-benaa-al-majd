import React, { useState, useMemo } from 'react'
import {
  ArrowUpRight,
  Search as SearchIcon,
  PackageCheck,
  MessageSquare,
  Sparkles,
} from 'lucide-react'
import Container from '../../components/common/Container.jsx'
import SectionTitle from '../../components/common/SectionTitle.jsx'
import Button from '../../components/common/Button.jsx'
import OptimizedImage from '../../components/common/OptimizedImage.jsx'
import Breadcrumb from '../../components/common/Breadcrumb.jsx'
import Badge from '../../components/common/Badge.jsx'
import Modal from '../../components/common/Modal.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import SEO from '../../components/common/SEO.jsx'
import { useProducts } from '../../admin/hooks/useProducts.js'

const CATEGORIES = [
  { id: 'all', label: 'All Products', labelAr: 'الكل' },
  { id: 'construction-materials', label: 'Construction Materials', labelAr: 'مواد البناء' },
  { id: 'finishes', label: 'Finishes & Ceramics', labelAr: 'التشطيبات والبورسلان' },
  { id: 'tools-machinery', label: 'Tools & Machinery', labelAr: 'المعدات والأدوات' },
  { id: 'safety-gear', label: 'Safety & PPE', labelAr: 'معدات السلامة' },
  { id: 'insulation', label: 'Insulation & Chemicals', labelAr: 'العوازل والمواد' },
  { id: 'plumbing', label: 'Plumbing & Valves', labelAr: 'السباكة والصمامات' },
]

export default function Products() {
  const { products } = useProducts()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const breadcrumbs = [
    { label: 'Al-Majd Lines', to: '/majd' },
    { label: 'Product Catalogue' },
  ]

  const activeProducts = useMemo(() => {
    return products.filter((p) => p.isActive !== false)
  }, [products])

  const filteredProducts = useMemo(() => {
    return activeProducts.filter((p) => {
      const matchCat =
        activeCategory === 'all' || p.category === activeCategory
      const matchSearch =
        !searchQuery.trim() ||
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nameAr?.includes(searchQuery) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.descriptionAr?.includes(searchQuery)
      return matchCat && matchSearch
    })
  }, [activeProducts, activeCategory, searchQuery])

  return (
    <div className="py-8 md:py-16 bg-gray-50/50">
      <SEO
        title="Products Catalog & Materials | AL MAJD"
        description="Certified construction materials, machinery, and equipment catalog imported and supplied by AL MAJD LINES FOR TRADE & IMPORT in Saudi Arabia."
        canonicalPath="/majd/products"
      />
      <Container>
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        <SectionTitle
          as="h1"
          eyebrow="AL MAJD LINES FOR TRADE & IMPORT"
          eyebrowAr="كتالوج منتجات مؤسسة خطوط المجد للتجارة والاستيراد"
          title="Certified Construction Materials & Equipment"
          titleAr="المواد والمعدات والمنتجات الإنشائية المعتمدة"
          subtitle="Directly imported, certified building products supplied to project sites across Saudi Arabia."
          subtitleAr="مستوردة مباشرة ومطابقة للمواصفات القياسية السعودية ومعتمدة للمشاريع الإنشائية."
        />

        {/* Filter & Search Bar */}
        <div className="mt-10 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories Pills */}
          <div className="flex items-center flex-wrap gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-majd text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/70'
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-[10px] font-arabic opacity-80 ml-1">({cat.labelAr})</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products / بحث في المنتجات..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-majd/50"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <EmptyState
            title="No products found"
            description="There are no products matching your search or category filter. Try clearing your search or selecting another category."
            className="my-10"
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 flex flex-col group cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <OptimizedImage
                    src={p.image}
                    alt={`${p.name || 'Imported Product'}${p.nameAr ? ` - ${p.nameAr}` : ''} | Al-Majd Trading`}
                    aspectRatio="16/9"
                    className="group-hover:scale-105 transition-transform duration-500 w-full h-full object-cover"
                    fallbackText={p.name}
                  />
                  <div className="absolute top-3 right-3 z-10">
                    <Badge variant="majd" size="sm" className="bg-white/95 backdrop-blur-sm">
                      AL MAJD LINES
                    </Badge>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-gray-900 text-base group-hover:text-majd transition-colors leading-snug">
                    {p.name}
                  </h3>
                  {p.nameAr && (
                    <p className="font-bold text-xs text-gray-600 font-arabic mt-1">
                      {p.nameAr}
                    </p>
                  )}
                  <p className="text-xs text-gray-600 mt-3 leading-relaxed flex-grow line-clamp-2">
                    {p.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="capitalize font-medium text-gray-600">
                      {p.category?.replace('-', ' ')}
                    </span>
                    <span className="text-majd font-semibold flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                      Inquire / Specs <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Sourcing Callout */}
        <div className="mt-14 p-8 bg-gradient-to-r from-majd/10 via-amber-500/5 to-transparent border border-majd/20 rounded-3xl text-center max-w-3xl mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm text-majd flex items-center justify-center mx-auto mb-2">
            <Sparkles className="w-6 h-6" />
          </div>
          <h4 className="font-extrabold text-gray-900 text-lg sm:text-xl">
            Looking for a custom product or bulk factory import?
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 font-arabic">
            هل تبحث عن توريد منتج خاص أو شحنات كميات كبرى مباشرة من المصانع العالمية؟
          </p>
          <div className="pt-2">
            <Button
              to="/contact?subject=Bulk%20Product%20Import%20Inquiry"
              variant="secondary"
              size="md"
            >
              Request Bulk Quotation / طلب تسعير كميات
            </Button>
          </div>
        </div>
      </Container>

      {/* Product Details Modal */}
      <Modal
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.name}
        subtitle={selectedProduct?.nameAr}
        maxWidth="max-w-2xl"
      >
        {selectedProduct && (
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-100">
              <OptimizedImage
                src={selectedProduct.image}
                alt={`${selectedProduct.name || 'Product'}${selectedProduct.nameAr ? ` - ${selectedProduct.nameAr}` : ''} | Specifications & Details`}
                aspectRatio="16/9"
                className="w-full h-full object-cover"
                fallbackText={selectedProduct.name}
              />
              <div className="absolute top-3 right-3">
                <Badge variant="majd" size="sm">
                  AL MAJD LINES
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <span className="font-semibold text-gray-800 capitalize">
                Category: {selectedProduct.category?.replace('-', ' ')}
              </span>
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <PackageCheck className="w-3.5 h-3.5" />
                SASO / Saber Compliant
              </span>
            </div>

            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>{selectedProduct.description}</p>
              {selectedProduct.descriptionAr && (
                <p className="font-arabic text-gray-600 text-xs sm:text-sm">
                  {selectedProduct.descriptionAr}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-gray-500">Need specifications sheet or wholesale quote?</span>
              <Button
                to={`/contact?subject=Product%20Inquiry:%20${encodeURIComponent(
                  selectedProduct.name
                )}`}
                variant="secondary"
                size="sm"
                icon={MessageSquare}
                className="w-full sm:w-auto"
                onClick={() => setSelectedProduct(null)}
              >
                Inquire This Product / طلب تسعير
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
