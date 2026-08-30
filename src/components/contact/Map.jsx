export default function Map() {
  return (
    <div className="w-full h-80 rounded-xl overflow-hidden">
      <iframe
        title="location-map"
        src="https://www.google.com/maps?q=Cairo,Egypt&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      />
    </div>
  )
}
