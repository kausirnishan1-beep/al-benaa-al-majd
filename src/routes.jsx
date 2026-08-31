import { Routes, Route, Link } from 'react-router-dom'
import { Home as HomeIcon, AlertCircle } from 'lucide-react'

// Public Pages
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Companies from './pages/Companies.jsx'
import Projects from './pages/Projects.jsx'
import Compliance from './pages/Compliance.jsx'
import Contact from './pages/Contact.jsx'

// Al-Benaa Contracting Sub-pages
import BenaaHome from './pages/Benaa/BenaaHome.jsx'
import Construction from './pages/Benaa/Construction.jsx'
import Renovation from './pages/Benaa/Renovation.jsx'
import Maintenance from './pages/Benaa/Maintenance.jsx'
import ProjectManagement from './pages/Benaa/ProjectManagement.jsx'
import BenaaProjects from './pages/Benaa/BenaaProjects.jsx'

// Al-Majd Trading Sub-pages
import MajdHome from './pages/Majd/MajdHome.jsx'
import ImportExport from './pages/Majd/ImportExport.jsx'
import GeneralTrading from './pages/Majd/GeneralTrading.jsx'
import ProductSourcing from './pages/Majd/ProductSourcing.jsx'
import Logistics from './pages/Majd/Logistics.jsx'
import Products from './pages/Majd/Products.jsx'

// Admin Portal Pages & Layout
import AdminLayout from './admin/components/AdminLayout.jsx'
import Login from './admin/pages/Login.jsx'
import Dashboard from './admin/pages/Dashboard.jsx'
import AdminCompanies from './admin/pages/Companies.jsx'
import AdminServices from './admin/pages/Services.jsx'
import AdminProjects from './admin/pages/Projects.jsx'
import AdminProducts from './admin/pages/Products.jsx'
import AdminMessages from './admin/pages/Messages.jsx'
import AdminDocuments from './admin/pages/Documents.jsx'
import AdminSettings from './admin/pages/Settings.jsx'

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
  )
}


