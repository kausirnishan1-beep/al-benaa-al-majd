import { Link } from 'react-router-dom'
import {
  Layers,
  ShoppingBag,
  Briefcase,
  Mail,
  FileText,
  Plus,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react'
import { useProjects } from '../hooks/useProjects.js'
import { useProducts } from '../hooks/useProducts.js'
import { useServices } from '../hooks/useServices.js'
import { useMessages } from '../hooks/useMessages.js'
import { useDocuments } from '../hooks/useDocuments.js'

export default function Dashboard() {
  const { projects } = useProjects()
  const { products } = useProducts()
  const { services } = useServices()
  const { messages } = useMessages()
  const { documents } = useDocuments()

  const unreadMessages = messages.filter((m) => !m.is_read)
  const recentProjects = projects.slice(0, 4)
  const recentMessages = messages.slice(0, 4)

  const stats = [
    {
      label: 'Total Projects',
      labelAr: 'المشاريع المنفذة',
      value: projects.length,
      icon: Layers,
      color: 'bg-emerald-500/10 text-emerald-600',
      to: '/admin/projects',
    },
    {
      label: 'Commercial Products',
      labelAr: 'المنتجات والتوريد',
      value: products.length,
      icon: ShoppingBag,
      color: 'bg-amber-500/10 text-amber-600',
      to: '/admin/products',
    },
    {
      label: 'Active Services',
      labelAr: 'الخدمات المعتمدة',
      value: services.length,
      icon: Briefcase,
      color: 'bg-blue-500/10 text-blue-600',
      to: '/admin/services',
    },
    {
      label: 'Inquiries & Messages',
      labelAr: 'رسائل التواصل',
      value: messages.length,
      badge: unreadMessages.length > 0 ? `${unreadMessages.length} Unread` : null,
      icon: Mail,
      color: 'bg-purple-500/10 text-purple-600',
      to: '/admin/messages',
    },
    {
      label: 'Compliance Docs',
      labelAr: 'المستندات والشهادات',
      value: documents.length,
      icon: FileText,
      color: 'bg-rose-500/10 text-rose-600',
      to: '/admin/documents',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-benaa via-benaa-dark to-[#041913] text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-majd-light text-xs font-bold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Database Connected & Operational</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome to Group Administration
          </h2>
          <p className="text-xs md:text-sm text-white/80 font-arabic mt-1">
            لوحة الإدارة المركزية لمجموعة البناء للإنشاءات وشركة المجد للتجارة العامة
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-majd text-white text-xs font-bold hover:bg-majd-light transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>New Project / إضافة مشروع</span>
          </Link>
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20"
          >
            <Plus className="w-4 h-4" />
            <span>New Product / إضافة منتج</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon
          return (
            <Link
              key={idx}
              to={s.to}
              className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {s.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-500 text-white animate-pulse">
                    {s.badge}
                  </span>
                )}
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900 leading-none mb-1">
                  {s.value}
                </p>
                <p className="text-xs font-bold text-gray-700">{s.label}</p>
                <p className="text-[10px] text-gray-400 font-arabic">{s.labelAr}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Two Columns: Recent Projects & Recent Inquiries */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h3 className="font-bold text-benaa text-base">Recent Projects</h3>
              <p className="text-[11px] font-bold text-gray-500 font-arabic">أحدث المشاريع المضافة</p>
            </div>
            <Link
              to="/admin/projects"
              className="inline-flex items-center gap-1 text-xs font-bold text-benaa hover:text-majd transition-colors"
            >
              <span>Manage All</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3 flex-grow">
            {recentProjects.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50/80 transition-colors border border-gray-50"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-gray-100"
                />
                <div className="min-w-0 flex-grow">
                  <p className="text-xs font-bold text-gray-900 truncate">{p.title}</p>
                  <p className="text-[10px] text-gray-500 font-arabic truncate">{p.titleAr}</p>
                  <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-gray-100 text-gray-600 mt-1 capitalize">
                    {p.company} • {p.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h3 className="font-bold text-benaa text-base">Recent Inquiries & Leads</h3>
              <p className="text-[11px] font-bold text-gray-500 font-arabic">أحدث طلبات التسعير والتواصل</p>
            </div>
            <Link
              to="/admin/messages"
              className="inline-flex items-center gap-1 text-xs font-bold text-benaa hover:text-majd transition-colors"
            >
              <span>View All</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3 flex-grow">
            {recentMessages.map((m) => (
              <div
                key={m.id}
                className={`p-4 rounded-2xl border transition-all ${
                  m.is_read
                    ? 'bg-gray-50/40 border-gray-100'
                    : 'bg-benaa/5 border-benaa/20'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-xs font-bold text-gray-900 truncate">{m.name}</p>
                  <span className="text-[10px] text-gray-400">
                    {new Date(m.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {m.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
