import { useState, useRef, useEffect } from 'react'

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '',
  type = 'default', // 'profile', 'logo', 'illustration'
  fallback = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiAxMmM0LjQxIDAgOC0zLjU5IDgtOHMtMy41OS04LTgtOC04IDMuNTktOCA4IDMuNTkgOCA4IDh6bTAgMmMtNS4zNCAwLTE2IDIuNjgtMTYgOHYyaDMydi0yYzAtNS4zMi0xMC42Ni04LTE2LTh6Ii8+PC9zdmc+',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)

  // Intersection Observer para lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Construir la URL optimizada basada en el tipo
  const getOptimizedSrc = () => {
    if (!src) return fallback
    
    // Si ya es una imagen optimizada (tiene parámetros), devolverla tal como está
    if (src.includes('?')) return src
    
    // Construir la URL con parámetros de optimización
    const params = new URLSearchParams()
    
    switch (type) {
      case 'profile':
        params.set('profile', 'true')
        break
      case 'logo':
        params.set('logo', 'true')
        break
      case 'illustration':
        params.set('illustration', 'true')
        break
      default:
        // Parámetros por defecto
        params.set('format', 'webp')
        params.set('quality', '80')
    }
    
    return `${src}?${params.toString()}`
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  const optimizedSrc = hasError ? fallback : getOptimizedSrc()

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder mientras carga */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-300/20 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white/30 border-t-white/70 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Imagen optimizada */}
      {isInView && (
        <img
          src={optimizedSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  )
}

export default OptimizedImage