import React, { useState } from 'react';
import './ResetPasswordProfile.css'; // Asegurate de que la ruta coincida

const ResetPasswordProfile = () => {
    // Ya no necesitamos currentPassword en el estado inicial
    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
        setError('');
    };

    const handleResetPassword = (e) => {
        e.preventDefault();

        if (passwords.newPassword !== passwords.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        if (passwords.newPassword.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        console.log('Enviando datos:', passwords);
        setSuccess('¡Contraseña actualizada con éxito!');
        setPasswords({ newPassword: '', confirmPassword: '' });
    };

    return (
        <div className="security-wrapper">
            <div className="security-header">
                <h2 className="security-title">Seguridad</h2>
                <p className="security-subtitle">
                    Actualizá tu contraseña para mantener tu cuenta de Streteat protegida.
                </p>
            </div>

            <form onSubmit={handleResetPassword} className="security-form">
                
                {/* --- ACÁ ESTÁ EL FIX PARA EL WARNING DEL DOM --- */}
                {/* Input oculto para que el gestor de contraseñas no se queje */}
                <input 
                    type="text" 
                    name="username" 
                    autoComplete="username" 
                    value="usuario@streteat.com" /* Acá deberías pasar el mail o user real si lo tenés a mano */
                    style={{ display: 'none' }} 
                    readOnly 
                />

                <div className="form-group">
                    <label htmlFor="newPassword">Nueva Contraseña</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handleChange}
                        placeholder="Mínimo 6 caracteres"
                        autoComplete="new-password"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repetí la nueva contraseña"
                        autoComplete="new-password"
                        required
                    />
                </div>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <button type="submit" className="submit-btn">
                    Actualizar Contraseña
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordProfile;