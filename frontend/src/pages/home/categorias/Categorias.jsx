import { Link } from 'react-router-dom';
import './Categorias.css';

const categoriasData = [
  // gridSpan: 'full' ocupará 2 columnas (horizontal), 'single' ocupará 1.
  { 
    id: 1, 
    titulo: 'HOODIES', 
    img: 'https://i.pinimg.com/1200x/1c/1f/67/1c1f67f5fa7288d859b226b73912568c.jpg', 
    gridSpan: 'full' 
  }, 
  { 
    id: 2, 
    titulo: 'REMERAS', 
    img: 'https://i.pinimg.com/736x/2a/80/9c/2a809cd0341727006650d7d8c9cbf019.jpg',
    gridSpan: 'single'
  }, 
  { 
    id: 3, 
    titulo: 'PANTALONES', 
    img: 'https://i.pinimg.com/1200x/a6/4a/03/a64a036051daacecd9fad1f759c95ed8.jpg',
    gridSpan: 'single'
  }, 
  { 
    id: 4, 
    titulo: 'CALZADOS', 
    img: 'https://i.pinimg.com/736x/46/00/0c/46000c0056cf032f722a17e0e002f298.jpg',
    gridSpan: 'full' 
  }, 
  { 
    id: 5, 
    titulo: 'ACCESORIOS', 
    img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1600&auto=format&fit=crop',
    gridSpan: 'full' 
  }
];

const Categorias = () => {
  return (
    <section className="categories-section">
      <h2 className="categories-title">EXPLORÁ LA COLECCIÓN</h2>
      
      <div className="categories-grid">
        {categoriasData.map((cat) => (
          <Link 
            to={`/productos/${cat.titulo.toLowerCase()}`}
            className={`categories-card ${cat.gridSpan === 'full' ? 'categories-span-full' : ''}`} 
            key={cat.id}
          >
            <img src={cat.img} alt={cat.titulo} className="categories-img" />
            <div className="categories-label">
              <span>{cat.titulo}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categorias;