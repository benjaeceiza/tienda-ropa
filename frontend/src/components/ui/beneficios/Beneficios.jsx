import { FiTruck, FiCreditCard, FiShield, FiRefreshCw } from 'react-icons/fi';
import './Beneficios.css';

const Beneficios = () => {
  const items = [
    { id: 1, icon: <FiTruck />, text: 'ENVÍOS A TODO EL PAÍS' },
    { id: 2, icon: <FiCreditCard />, text: '3 Y 6 CUOTAS SIN INTERÉS' },
    { id: 3, icon: <FiShield />, text: 'COMPRA 100% SEGURA' },
    { id: 4, icon: <FiRefreshCw />, text: 'CAMBIOS GRATIS POR 30 DÍAS' },
  ];

  return (
    <section className="benefits-container">
      <div className="benefits-track">
        {/* Duplicamos los items para que el scroll infinito no tenga saltos */}
        {[...items, ...items].map((item, index) => (
          <div className="benefits-item" key={index}>
            <span className="benefits-icon">{item.icon}</span>
            <span className="benefits-text">{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Beneficios;