import { useState, useRef } from 'react'
import { UploadCloud, Image as ImageIcon, X, Link2, Check } from 'lucide-react'
import { supabase } from '../../utils/supabaseClient.js'

export default function ImageUploader({ value, onChange, label = 'Image / الصورة' }) {
  const [activeTab, setActiveTab] = useState('upload') // 'upload' | 'url'
  const [urlInput, setUrlInput] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadError('')

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
      const filePath = `uploads/${fileName}`

      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (error) throw error

      if (data) {
        const { data: publicUrlData } = supabase.storage
          .from('images')
          .getPublicUrl(filePath)

        if (publicUrlData?.publicUrl) {
          onChange(publicUrlData.publicUrl)
          setIsUploading(false)
          return
        }
      }
      throw new Error('Failed to retrieve public URL for uploaded image')
    } catch (err) {
      console.error('Storage upload error:', err)
      setUploadError(err.message || 'Image upload failed. Ensure the "images" bucket exists in Supabase Storage with public access.')
      setIsUploading(false)
    }
  }

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim())
      setUrlInput('')
      setUploadError('')
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
            Image URL
          </button>
        </div>
      </div>

      {value ? (
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 aspect-video max-h-56 bg-gray-50 group">
          <img
            src={value}
            alt="Uploaded preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-bold shadow hover:bg-gray-100"
            >
              Change Image
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1.5 rounded-lg bg-red-600 text-white shadow hover:bg-red-700"
              title="Remove Image"
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
            {isUploading ? 'Uploading Image...' : 'Click or Drag & Drop image file here'}
          </p>
          <p className="text-[11px] text-gray-500 font-arabic mt-1">
            يدعم صور JPG, PNG, WEBP حتى 5 ميجابايت
          </p>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
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

      {uploadError && (
        <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <X className="w-4 h-4 flex-shrink-0 cursor-pointer" onClick={() => setUploadError('')} />
          <span className="flex-grow">{uploadError}</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}
