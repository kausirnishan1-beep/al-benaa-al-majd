export default function Map() {
  return (
    <div className="w-full h-80 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
      <iframe
        title="location-map"
        src="https://www.google.com/maps?q=Riyadh,Saudi+Arabia&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      />
    </div>
  )
}

