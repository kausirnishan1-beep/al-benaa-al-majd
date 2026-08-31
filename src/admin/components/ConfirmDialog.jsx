import { AlertTriangle, X } from 'lucide-react'

export default function ConfirmDialog({
  isOpen,
  title = 'Are you sure? / هل أنت متأكد؟',
  message = 'This action cannot be undone.',
  confirmText = 'Delete / حذف',
  cancelText = 'Cancel / إلغاء',
  isDestructive = true,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-gray-100 relative animate-scale-up">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
            isDestructive ? 'bg-red-50 text-red-600' : 'bg-benaa/10 text-benaa'
          }`}>
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-snug">{title}</h3>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-md transition-all ${
              isDestructive
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-benaa hover:bg-benaa-light'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
