

function Background() {
  return (
    <div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 z-0" />
        <svg className="absolute top-0 w-full z-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff33" fillOpacity="1" d="M0,32L48,48C96,64,192,96,288,122.7C384,149,480,171,576,181.3C672,192,768,192,864,165.3C960,139,1056,85,1152,64C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
        </svg>
        <svg className="absolute bottom-0 w-full z-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#ffffff33" fillOpacity="1" d="M0,64L60,85.3C120,107,240,149,360,149.3C480,149,600,107,720,106.7C840,107,960,149,1080,170.7C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
        </svg>
    </div>
  )
}

export default Background