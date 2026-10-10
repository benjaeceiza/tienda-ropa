import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Hero.css';

const sliderData = [
  // Opción 1: Estética urbana nocturna con luces de neón
{
  id: 4,
  title: 'NIGHT CITY',
  subtitle: 'ESTILO NOCTURNO',
  image: 'https://images.unsplash.com/photo-1510853851847-5c02796e8c8a?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  cta: 'Explorar'
},

// Opción 2: Primer plano de zapatillas (Sneakers)
{
  id: 5,
  title: 'KICKS',
  subtitle: 'SNEAKERS EXCLUSIVOS',
  image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1920&auto=format&fit=crop',
  cta: 'Ver Colección'
},

// Opción 3: Modelo con hoodie y tonos oscuros (Muy parecida a tu imagen de referencia)
{
  id: 6,
  title: 'ESSENTIALS',
  subtitle: 'HOODIES & MÁS',
  image: 'https://images.unsplash.com/photo-1557130680-0f816eef4743?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  cta: 'Comprar'
},

// Opción 4: Estilo minimalista con mucho contraste
{
  id: 7,
  title: 'MINIMAL',
  subtitle: 'MENOS ES MÁS',
  image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1920&auto=format&fit=crop',
  cta: 'Descubrir'
}
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <section className="hero-container">
      {/* Flechas de navegación */}
      <FiChevronLeft className="hero-arrow hero-prev" onClick={prevSlide} />
      <FiChevronRight className="hero-arrow hero-next" onClick={nextSlide} />

      {/* Contenedor de los slides */}
      {sliderData.map((slide, index) => {
        return (
          <div 
            className={`hero-slide ${index === currentSlide ? 'hero-current' : ''}`} 
            key={slide.id}
          >
            {index === currentSlide && (
              <>
                <img src={slide.image} alt={slide.title} className="hero-image" />
                <div className="hero-content">
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-subtitle">{slide.subtitle}</p>
                  <button className="hero-btn-cta">{slide.cta}</button>
                </div>
              </>
            )}
          </div>
        );
      })}

      {/* Puntos (Dots) */}
      <div className="hero-dots-container">
        {sliderData.map((_, index) => (
          <span 
            key={index} 
            className={`hero-dot ${index === currentSlide ? 'hero-dot-active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Hero;