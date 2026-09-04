import { useState } from 'react'
import { Mail, Trash2, Eye, MessageSquare, Copy, Check, ExternalLink } from 'lucide-react'
import { useMessages } from '../hooks/useMessages.js'
import DataTable from '../components/DataTable.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'

export default function Messages() {
  const { messages, markAsRead, deleteMessage } = useMessages()

  const [selectedMessage, setSelectedMessage] = useState(null)
  const [deleteTargetId, setDeleteTargetId] = useState(null)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleCopyEmail = (email) => {
    if (!email) return
    navigator.clipboard.writeText(email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const handleOpenDetail = (msg) => {
    setSelectedMessage(msg)
    if (!msg.is_read) {
      markAsRead(msg.id, true)
    }
  }

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      const res = await deleteMessage(deleteTargetId)
      if (res?.success === false) {
        alert(`Error deleting message: ${res.error}`)
      }
      setDeleteTargetId(null)
      if (selectedMessage?.id === deleteTargetId) {
        setSelectedMessage(null)
      }
    }
  }

  const columns = [
    {
      header: 'Sender / المرسل',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${
            row.is_read ? 'bg-gray-100 text-gray-500' : 'bg-benaa text-white'
          }`}>
            {row.name.charAt(0)}
          </div>
          <div>
            <p className={`text-xs ${row.is_read ? 'font-medium text-gray-800' : 'font-black text-gray-900'}`}>
              {row.name}
            </p>
            <p className="text-[11px] text-gray-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Phone / الجوال',
      render: (row) => (
        <span className="text-xs text-gray-600 font-mono">
          {row.phone || '—'}
        </span>
      ),
    },
    {
      header: 'Message Excerpt / محتوى الرسالة',
      render: (row) => (
        <p className="text-xs text-gray-600 line-clamp-1 max-w-md">
          {row.message}
        </p>
      ),
    },
    {
      header: 'Date & Status',
      render: (row) => (
        <div className="flex items-center gap-2">
          <span
            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
              row.is_read ? 'bg-gray-100 text-gray-600' : 'bg-red-50 text-red-600 font-extrabold'
            }`}
          >
            {row.is_read ? 'Read' : 'New / جديد'}
          </span>
          <span className="text-[10px] text-gray-400">
            {new Date(row.created_at).toLocaleDateString()}
          </span>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-benaa leading-tight">
            Contact Inquiries & Quotation Submissions
          </h2>
          <p className="text-xs font-bold text-gray-500 font-arabic mt-0.5">
            رسائل العملاء وطلبات عروض الأسعار الواردة من الموقع الإلكتروني
          </p>
        </div>

        <div className="text-xs font-bold text-gray-500 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
          Total: <span className="text-benaa font-black">{messages.length}</span> (
          <span className="text-red-600 font-black">{messages.filter((m) => !m.is_read).length} Unread</span>)
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={messages}
        searchKey="name"
        searchPlaceholder="Search sender name, email, phone... / بحث باسم المرسل أو الهاتف..."
        actions={(row) => (
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => handleOpenDetail(row)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-benaa/10 text-benaa hover:bg-benaa hover:text-white text-xs font-bold transition-all"
              title="View Message"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View</span>
            </button>
            <button
              type="button"
              onClick={() => setDeleteTargetId(row.id)}
              className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Delete Message"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-benaa text-white flex items-center justify-center font-bold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-benaa text-base">Client Message Details</h3>
                  <p className="text-xs text-gray-400">
                    Received: {new Date(selectedMessage.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5 text-xs text-gray-700">
              <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div>
                  <span className="block font-bold text-gray-400 text-[10px] uppercase">Client Name</span>
                  <p className="font-bold text-gray-900 text-sm mt-0.5">{selectedMessage.name}</p>
                </div>

                <div>
                  <span className="block font-bold text-gray-400 text-[10px] uppercase">Email Address</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(selectedMessage.email)}&su=${encodeURIComponent('Inquiry Response - Al-Benaa & Al-Majd Group')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-benaa hover:underline text-xs block truncate"
                      title="Open in Gmail Web"
                    >
                      {selectedMessage.email}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopyEmail(selectedMessage.email)}
                      className="text-gray-400 hover:text-benaa p-1 rounded-md hover:bg-gray-100 transition-colors"
                      title="Copy Email Address"
                    >
                      {copiedEmail ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="block font-bold text-gray-400 text-[10px] uppercase">Phone Number</span>
                  <p className="font-bold text-gray-900 text-xs font-mono mt-0.5">
                    {selectedMessage.phone || 'Not Provided'}
                  </p>
                </div>

                <div>
                  <span className="block font-bold text-gray-400 text-[10px] uppercase">Status</span>
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 mt-1">
                    Marked as Read ✅
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-500 uppercase tracking-wider text-[11px] mb-2">
                  Message Content / نص الرسالة
                </label>
                <div className="p-5 rounded-2xl bg-white border border-gray-200 text-gray-800 leading-relaxed text-xs sm:text-sm whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Action Buttons: WhatsApp & Direct Webmail Compose */}
              <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-gray-100">
                {selectedMessage.phone && (
                  <a
                    href={`https://wa.me/${selectedMessage.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all shadow-sm active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Client</span>
                  </a>
                )}

                {/* Direct Gmail Web Compose */}
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                    selectedMessage.email
                  )}&su=${encodeURIComponent(
                    'Inquiry Response - Al-Benaa & Al-Majd Group'
                  )}&body=${encodeURIComponent(
                    `Dear ${selectedMessage.name},\n\nThank you for contacting Al-Benaa & Al-Majd Group.\n\nRegarding your inquiry:\n"${selectedMessage.message}"\n\nKind regards,\nCustomer Relations Team\nAl-Benaa & Al-Majd Group`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-benaa text-white font-bold text-xs hover:bg-benaa-light transition-all shadow-sm active:scale-95"
                  title="Open directly in Gmail Web Compose"
                >
                  <Mail className="w-4 h-4" />
                  <span>Reply via Gmail</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                {/* Default Mail Client (Outlook/Windows Mail) */}
                <a
                  href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(
                    'Inquiry Response - Al-Benaa & Al-Majd Group'
                  )}&body=${encodeURIComponent(
                    `Dear ${selectedMessage.name},\n\nThank you for contacting Al-Benaa & Al-Majd Group.\n\nRegarding your inquiry:\n"${selectedMessage.message}"\n\n`
                  )}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200 transition-colors"
                  title="Open in System Default Mail Client"
                >
                  <span>Default Mail App</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    markAsRead(selectedMessage.id, !selectedMessage.is_read)
                    setSelectedMessage(null)
                  }}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-colors ml-auto"
                >
                  Mark Unread
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        title="Delete Message / حذف الرسالة"
        message="Are you sure you want to permanently delete this client inquiry? / هل أنت متأكد من رغبتك في حذف هذه الرسالة نهائياً؟"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  )
}
