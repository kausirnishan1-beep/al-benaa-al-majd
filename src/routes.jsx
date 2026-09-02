import { lazy, Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Home as HomeIcon, AlertCircle, Loader2 } from 'lucide-react'

// Public Pages (Lazy Loaded for performance & code-splitting)
const Home = lazy(() => import('./pages/Home.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Companies = lazy(() => import('./pages/Companies.jsx'))
const Projects = lazy(() => import('./pages/Projects.jsx'))
const Compliance = lazy(() => import('./pages/Compliance.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))

// Al-Benaa Contracting Sub-pages
const BenaaHome = lazy(() => import('./pages/Benaa/BenaaHome.jsx'))
const Construction = lazy(() => import('./pages/Benaa/Construction.jsx'))
const Renovation = lazy(() => import('./pages/Benaa/Renovation.jsx'))
const Maintenance = lazy(() => import('./pages/Benaa/Maintenance.jsx'))
const ProjectManagement = lazy(() => import('./pages/Benaa/ProjectManagement.jsx'))
const BenaaProjects = lazy(() => import('./pages/Benaa/BenaaProjects.jsx'))

// Al-Majd Trading Sub-pages
const MajdHome = lazy(() => import('./pages/Majd/MajdHome.jsx'))
const ImportExport = lazy(() => import('./pages/Majd/ImportExport.jsx'))
const GeneralTrading = lazy(() => import('./pages/Majd/GeneralTrading.jsx'))
const ProductSourcing = lazy(() => import('./pages/Majd/ProductSourcing.jsx'))
const Logistics = lazy(() => import('./pages/Majd/Logistics.jsx'))
const Products = lazy(() => import('./pages/Majd/Products.jsx'))

// Admin Portal Pages & Layout
const AdminLayout = lazy(() => import('./admin/components/AdminLayout.jsx'))
const Login = lazy(() => import('./admin/pages/Login.jsx'))
const Dashboard = lazy(() => import('./admin/pages/Dashboard.jsx'))
const AdminCompanies = lazy(() => import('./admin/pages/Companies.jsx'))
const AdminServices = lazy(() => import('./admin/pages/Services.jsx'))
const AdminProjects = lazy(() => import('./admin/pages/Projects.jsx'))
const AdminProducts = lazy(() => import('./admin/pages/Products.jsx'))
const AdminMessages = lazy(() => import('./admin/pages/Messages.jsx'))
const AdminDocuments = lazy(() => import('./admin/pages/Documents.jsx'))
const AdminSettings = lazy(() => import('./admin/pages/Settings.jsx'))

function RouteFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center py-20">
      <Loader2 className="w-8 h-8 text-benaa animate-spin mb-3" />
      <p className="text-xs font-bold text-gray-500 font-arabic tracking-wide">جاري التحميل...</p>
    </div>
  )
}

function NotFound() {
  return (
    <div className="py-28 px-4 text-center max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-3xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-benaa tracking-tight">404 | Page Not Found</h1>
      <p className="text-lg font-bold text-gray-700 font-arabic mt-1">الصفحة غير موجودة</p>
      <p className="text-sm text-gray-600 mt-4 leading-relaxed">
        The page you are looking for might have been removed, renamed, or is temporarily unavailable.
      </p>
      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-benaa text-white font-bold text-sm shadow-md hover:bg-benaa-light transition-all"
        >
          <HomeIcon className="w-4 h-4" />
          <span>Return to Homepage (العودة للرئيسية)</span>
        </Link>
      </div>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/contact" element={<Contact />} />

        {/* Al-Benaa Contracting */}
        <Route path="/benaa" element={<BenaaHome />} />
        <Route path="/benaa/construction" element={<Construction />} />
        <Route path="/benaa/renovation" element={<Renovation />} />
        <Route path="/benaa/maintenance" element={<Maintenance />} />
        <Route path="/benaa/project-management" element={<ProjectManagement />} />
        <Route path="/benaa/projects" element={<BenaaProjects />} />

        {/* Al-Majd Trading */}
        <Route path="/majd" element={<MajdHome />} />
        <Route path="/majd/import-export" element={<ImportExport />} />
        <Route path="/majd/general-trading" element={<GeneralTrading />} />
        <Route path="/majd/product-sourcing" element={<ProductSourcing />} />
        <Route path="/majd/logistics" element={<Logistics />} />
        <Route path="/majd/products" element={<Products />} />

        {/* Admin Portal Authentication */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Protected Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="companies" element={<AdminCompanies />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="documents" element={<AdminDocuments />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}


