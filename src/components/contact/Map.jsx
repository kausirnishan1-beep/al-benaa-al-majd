import { useSettings } from '../../admin/hooks/useSettings.js'
import { MapPin, Navigation } from 'lucide-react'
import { buildGoogleMapsDirectionsUrl, buildGoogleMapsEmbedUrl, getHeadquartersAddress } from '../../utils/maps.js'

export default function Map() {
  const { settings } = useSettings()
  const address = getHeadquartersAddress(settings?.contact)
  const mapUrl = buildGoogleMapsEmbedUrl(address)
  const directionsUrl = buildGoogleMapsDirectionsUrl(address)

  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-white">
      <div className="h-72 sm:h-80">
        <iframe
          title={`Headquarters map: ${address}`}
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:px-5 border-t border-gray-100">
        <div className="flex items-start gap-2.5 min-w-0">
          <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-gray-700 leading-relaxed break-words">{address}</p>
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-benaa px-4 py-2.5 text-sm font-bold text-white hover:bg-benaa-light transition-colors flex-shrink-0"
        >
          <Navigation className="w-4 h-4" aria-hidden="true" />
          Get Directions / الاتجاهات
        </a>
      </div>
    </div>
  )
}


