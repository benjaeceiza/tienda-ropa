import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <section className="not-found-container">
            <div className="not-found-content">
         
                <h1 className="glitch-text" data-text="404">404</h1>
                
                <h2>RUTA NO ENCONTRADA</h2>
                <p>Parece que te perdiste en la calle. La página que buscás no existe o fue movida a otro barrio.</p>
                
                <Link to="/" className="btn-volver-home">
                    Volver al Inicio
                </Link>
            </div>
        </section>
    );
};

export default NotFound;