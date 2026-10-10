import { useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiChevronLeft } from 'react-icons/fi';
import './Auth.css';
import { useLoader } from '../../context/loader-context/LoaderContext';
import { useAuth } from '../../context/auth-context/AuthContext';

const Login = () => {
  const { showLoader, hideLoader } = useLoader();
  const { signin, errors } = useAuth();
  const navigate = useNavigate();

  // Estados para el formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  
  // NUEVO: Estado para el loader local del botón
  const [isSubmitting, setIsSubmitting] = useState(false);

  useLayoutEffect(() => {
    showLoader();
    const timer = setTimeout(() => {
      hideLoader();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Iniciamos el loader local en el botón
    setIsSubmitting(true); 

    const result = await signin(email, password);

    if (result.success) {
      // 2. Si es exitoso, sacamos el del botón y mandamos el global para la transición
      setIsSubmitting(false);
      showLoader(); 
      
      setTimeout(() => {
        hideLoader();
        navigate('/'); 
      }, 1000); 
    } else {
      // 3. Si falla, solo apagamos el del botón para mostrar el mensaje de error
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-split-container">
      <div className="auth-image login-bg">
        <Link to="/" className="auth-back-link">
          <FiChevronLeft /> Volver a la tienda
        </Link>
      </div>

      <div className="auth-side-panel">
        <div className="auth-panel-content">
          <h1 className="auth-title">INICIAR SESIÓN</h1>
          <p className="auth-subtitle">Bienvenido de vuelta a STRETEAT.</p>

          {errors.length > 0 && (
            <div className="auth-error-msg">
              {errors.map((error, i) => <p key={i}>{error}</p>)}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="tu@email.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-input-group">
              <label>Contraseña</label>
              <div className="auth-password-wrapper">
                <input
                  type={mostrarPassword ? "text" : "password"}
                  placeholder="Ingresá tu contraseña"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                >
                  {mostrarPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="auth-forgot">
              <Link to="#">¿Olvidaste tu contraseña?</Link>
            </div>

            {/* 4. Botón con loader condicional y deshabilitado mientras carga */}
            <button 
              type="submit" 
              className="auth-submit-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? <div className="btn-spinner"></div> : "INGRESAR"}
            </button>
          </form>

          <div className="auth-footer">
            <p>¿No tenés una cuenta? <Link to="/register">Registrate acá</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;