import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Companies from './pages/Companies.jsx'
import Projects from './pages/Projects.jsx'
import Compliance from './pages/Compliance.jsx'
import Contact from './pages/Contact.jsx'

import BenaaHome from './pages/Benaa/BenaaHome.jsx'
import Construction from './pages/Benaa/Construction.jsx'
import Renovation from './pages/Benaa/Renovation.jsx'
import Maintenance from './pages/Benaa/Maintenance.jsx'
import ProjectManagement from './pages/Benaa/ProjectManagement.jsx'
import BenaaProjects from './pages/Benaa/BenaaProjects.jsx'

import MajdHome from './pages/Majd/MajdHome.jsx'
import ImportExport from './pages/Majd/ImportExport.jsx'
import GeneralTrading from './pages/Majd/GeneralTrading.jsx'
import ProductSourcing from './pages/Majd/ProductSourcing.jsx'
import Logistics from './pages/Majd/Logistics.jsx'
import Products from './pages/Majd/Products.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/compliance" element={<Compliance />} />
      <Route path="/contact" element={<Contact />} />

      {/* Al-Benaa */}
      <Route path="/benaa" element={<BenaaHome />} />
      <Route path="/benaa/construction" element={<Construction />} />
      <Route path="/benaa/renovation" element={<Renovation />} />
      <Route path="/benaa/maintenance" element={<Maintenance />} />
      <Route path="/benaa/project-management" element={<ProjectManagement />} />
      <Route path="/benaa/projects" element={<BenaaProjects />} />

      {/* Al-Majd */}
      <Route path="/majd" element={<MajdHome />} />
      <Route path="/majd/import-export" element={<ImportExport />} />
      <Route path="/majd/general-trading" element={<GeneralTrading />} />
      <Route path="/majd/product-sourcing" element={<ProductSourcing />} />
      <Route path="/majd/logistics" element={<Logistics />} />
      <Route path="/majd/products" element={<Products />} />

      <Route path="*" element={<div className="p-20 text-center text-2xl">404 | Page Not Found</div>} />
    </Routes>
  )
}
