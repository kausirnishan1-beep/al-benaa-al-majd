import { useSettings } from '../../admin/hooks/useSettings.js'

const DEFAULT_MAP_URL = 'https://www.google.com/maps?q=Riyadh,Saudi+Arabia&output=embed'

function getSafeMapUrl(value) {
  try {
    const url = new URL(value)
    const isGoogleMaps = url.protocol === 'https:' && (
      url.hostname === 'google.com' ||
      url.hostname === 'www.google.com' ||
      url.hostname === 'maps.google.com'
    )
    return isGoogleMaps ? url.toString() : DEFAULT_MAP_URL
  } catch {
    return DEFAULT_MAP_URL
  }
}

export default function Map() {
  const { settings } = useSettings()
  const mapUrl = getSafeMapUrl(settings?.contact?.mapEmbedUrl || DEFAULT_MAP_URL)

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
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}


