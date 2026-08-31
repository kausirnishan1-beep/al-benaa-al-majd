import { useState, useRef } from 'react'
import { UploadCloud, FileText, X, Check, Link2 } from 'lucide-react'
import { supabase } from '../../utils/supabaseClient.js'

export default function FileUploader({
  value,
  onChange,
  label = 'Document File / ملف المستند',
  accept = '.pdf,.doc,.docx',
}) {
  const [activeTab, setActiveTab] = useState('upload') // 'upload' | 'url'
  const [urlInput, setUrlInput] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef(null)

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setIsUploading(true)

    // Try Supabase Storage
    try {
      const fileExt = file.name.split('.').pop()
      const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
      const filePath = `documents/${cleanFileName}`

      const { data, error } = await supabase.storage
        .from('documents')
        .upload(filePath, file)

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from('documents')
          .getPublicUrl(filePath)

        if (publicUrlData?.publicUrl) {
          onChange(publicUrlData.publicUrl)
          setIsUploading(false)
          return
        }
      }
    } catch (err) {
      console.warn('Document storage upload error, using local fallback:', err)
    }

    // Fallback URL or relative mock path
    onChange(`/documents/${file.name}`)
    setIsUploading(false)
  }

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim())
      setUrlInput('')
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
          {label}
        </label>
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
              activeTab === 'upload' ? 'bg-benaa text-white' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
              activeTab === 'url' ? 'bg-benaa text-white' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Document URL
          </button>
        </div>
      </div>

      {value && value !== '#' ? (
        <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-benaa/10 text-benaa flex items-center justify-center font-bold flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-gray-900 truncate">
                {fileName || value.split('/').pop() || 'Document Attached'}
              </p>
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-benaa hover:underline truncate block"
              >
                {value}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-50"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => {
                onChange('#')
                setFileName('')
              }}
              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
              title="Remove File"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : activeTab === 'upload' ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 hover:border-benaa rounded-2xl p-6 text-center cursor-pointer transition-all bg-gray-50/50 hover:bg-benaa/5 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 shadow-sm text-benaa flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-gray-700">
            {isUploading ? 'Uploading Document...' : 'Click to Upload PDF or Compliance Certificate'}
          </p>
          <p className="text-[11px] text-gray-500 font-arabic mt-1">
            يدعم ملفات PDF, DOC, DOCX حتى 15 ميجابايت
          </p>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/document.pdf or /documents/profile.pdf"
            className="flex-grow px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-benaa/30 focus:border-benaa"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-4 py-2.5 rounded-xl bg-benaa text-white text-xs font-bold hover:bg-benaa-light transition-colors flex items-center gap-1.5 flex-shrink-0"
          >
            <Check className="w-4 h-4" />
            <span>Apply</span>
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}
