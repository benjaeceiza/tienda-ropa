import {FiLogOut} from 'react-icons/fi';

const UserInfo = ({ formData, handleInputChange, handleGuardarDatos, logout }) => {
    return (
        <div className="tab-pane fade-in">
            <h2>Datos Personales</h2>
            <p className="tab-subtitle">Actualizá tu información para agilizar tus compras.</p>

            <form className="perfil-form" onSubmit={handleGuardarDatos}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Nombre</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Apellido</label>
                        <input type="text" name="apellido" value={formData.apellido} onChange={handleInputChange} required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Email (No editable)</label>
                        <input type="email" name="email" value={formData.email} disabled className="disabled-input" />
                    </div>
                    <div className="form-group">
                        <label>Teléfono</label>
                        <input type="text" name="telefono" placeholder="+54 9 11..." value={formData.telefono} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="form-actions-mobile">
                    <button type="submit" className="perfil-btn-save">Guardar Cambios</button>
                    {/* Botón de logout visible solo en mobile dentro de la pestaña */}
                    <button type="button" className="btn-cancel mobile-only logout-mobile-text" onClick={logout}>
                        <FiLogOut style={{ marginRight: '8px' }} /> Cerrar Sesión
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserInfo;