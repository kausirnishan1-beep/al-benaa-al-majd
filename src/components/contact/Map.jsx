import { useSettings } from '../../admin/hooks/useSettings.js'

export default function Map() {
  const { settings } = useSettings()
  const mapUrl = settings?.contact?.mapEmbedUrl || 'https://www.google.com/maps?q=Riyadh,Saudi+Arabia&output=embed'

  return (
    <div className="w-full h-80 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
      <iframe
        title="location-map"
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      />
    </div>
  )
}


