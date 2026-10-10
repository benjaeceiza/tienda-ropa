import { useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiChevronLeft } from 'react-icons/fi';
import './Auth.css';
import { useLoader } from '../../context/loader-context/LoaderContext';
import { useAuth } from '../../context/auth-context/AuthContext';

const Register = () => {
    const { showLoader, hideLoader } = useLoader();
    const { signup, errors } = useAuth();
    const navigate = useNavigate();

    // 1. Estado unificado para el formulario
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [mostrarPass, setMostrarPass] = useState(false);
    const [mostrarConfirm, setMostrarConfirm] = useState(false);
    const [localError, setLocalError] = useState(null);
    
    // NUEVO: Estado para el loader local del botón
    const [isSubmitting, setIsSubmitting] = useState(false);

    useLayoutEffect(() => {
        showLoader();
        const timer = setTimeout(() => {
            hideLoader();
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);

        // Validación frontal rápida
        if (formData.password !== formData.confirmPassword) {
            return setLocalError("Las contraseñas no coinciden");
        }

        // 2. Iniciamos el loader local en el botón
        setIsSubmitting(true); 

        const result = await signup(formData);

        if (result.success) {
            // 3. Si es exitoso: apagamos local, mandamos global y redirigimos
            setIsSubmitting(false);
            showLoader(); 
            
            setTimeout(() => {
                hideLoader();
                navigate('/'); 
            }, 1000); 
        } else {
            // 4. Si hay error de API (ej: email repetido), solo apagamos el local
            setIsSubmitting(false);
        }
    };

    return (
        <section className="auth-split-container">
            <div className="auth-image register-bg">
                <Link to="/" className="auth-back-link">
                    <FiChevronLeft /> Volver a la tienda
                </Link>
            </div>

            <div className="auth-side-panel">
                <div className="auth-panel-content">
                    <h1 className="auth-title">CREAR CUENTA</h1>
                    <p className="auth-subtitle">Unite a la cultura. Unite al club.</p>

                    {(errors.length > 0 || localError) && (
                        <div className="auth-error-msg">
                            {localError && <p>{localError}</p>}
                            {errors.map((error, i) => <p key={i}>{error}</p>)}
                        </div>
                    )}

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="auth-row">
                            <div className="auth-input-group">
                                <label>Nombre</label>
                                <input name="nombre" type="text" placeholder="Tu nombre" required onChange={handleChange} />
                            </div>
                            <div className="auth-input-group">
                                <label>Apellido</label>
                                <input name="apellido" type="text" placeholder="Tu apellido" required onChange={handleChange} />
                            </div>
                        </div>

                        <div className="auth-input-group">
                            <label>Teléfono</label>
                            <input name="telefono" type="tel" placeholder="Ej: 11 1234 5678" required onChange={handleChange} />
                        </div>

                        <div className="auth-input-group">
                            <label>Email</label>
                            <input name="email" type="email" placeholder="tu@email.com" required onChange={handleChange} />
                        </div>

                        <div className="auth-input-group">
                            <label>Contraseña</label>
                            <div className="auth-password-wrapper">
                                <input
                                    name="password"
                                    type={mostrarPass ? "text" : "password"}
                                    placeholder="Creá una contraseña"
                                    required
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="auth-eye-btn"
                                    onClick={() => setMostrarPass(!mostrarPass)}
                                >
                                    {mostrarPass ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>

                        <div className="auth-input-group">
                            <label>Confirmar Contraseña</label>
                            <div className="auth-password-wrapper">
                                <input
                                    name="confirmPassword"
                                    type={mostrarConfirm ? "text" : "password"}
                                    placeholder="Repetí la contraseña"
                                    required
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="auth-eye-btn"
                                    onClick={() => setMostrarConfirm(!mostrarConfirm)}
                                >
                                    {mostrarConfirm ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>

                        {/* 5. Botón con loader condicional */}
                        <button 
                            type="submit" 
                            className="auth-submit-btn" 
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <div className="btn-spinner"></div> : "REGISTRARSE"}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>¿Ya tenés una cuenta? <Link to="/login">Iniciá sesión</Link></p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;