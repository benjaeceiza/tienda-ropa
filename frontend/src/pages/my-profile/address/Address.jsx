

import { FiMapPin, FiPlus } from 'react-icons/fi';
import { useUser } from '../../../context/user-context/UserContext';
import { useToast } from '../../../context/toast-context/ToastContext';

const Address = ({ showAddressForm, editingAddressId, newAddress, setNewAddress, handleAddressSubmit, cerrarFormularioDireccion, handleAddNewClick, setPrincipal,handleEditClick, handleDeleteClick }) => {

    const { perfil } = useUser();
    const { showToast } = useToast();

    return (
        <div className="tab-pane fade-in">
            <div className="tab-header-flex">
                <div>
                    <h2>Mis Direcciones</h2>
                    <p className="tab-subtitle">Gestioná a dónde te mandamos la pilcha.</p>
                </div>

            </div>

            {/* --- FORMULARIO DE AGREGAR/EDITAR DIRECCIÓN --- */}
            {showAddressForm ? (
                <div className="address-form-container">
                    <h3>{editingAddressId ? 'Editar Ubicación' : 'Agregar Ubicación'}</h3>
                    <form className="perfil-form" onSubmit={handleAddressSubmit}>
                        <div className="form-row">
                            <div className="form-group" style={{ flex: 2 }}>
                                <label>Calle</label>
                                <input type="text" placeholder="Ej: Av. San Martín" value={newAddress.calle} onChange={(e) => setNewAddress({ ...newAddress, calle: e.target.value })} required />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Número</label>
                                <input type="text" placeholder="Ej: 1234" value={newAddress.numero} onChange={(e) => setNewAddress({ ...newAddress, numero: e.target.value })} required />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Piso / Depto</label>
                                <input type="text" placeholder="Ej: 3B" value={newAddress.pisoDepto} onChange={(e) => setNewAddress({ ...newAddress, pisoDepto: e.target.value })} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group" style={{ flex: 1.5 }}>
                                <label>Barrio</label>
                                <input type="text" placeholder="Ej: Centro" value={newAddress.barrio} onChange={(e) => setNewAddress({ ...newAddress, barrio: e.target.value })} required />
                            </div>
                            <div className="form-group" style={{ flex: 1.5 }}>
                                <label>Ciudad</label>
                                <input type="text" placeholder="Ej: Villa Mercedes" value={newAddress.ciudad} onChange={(e) => setNewAddress({ ...newAddress, ciudad: e.target.value })} required />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Provincia</label>
                                <input type="text" placeholder="Ej: San Luis" value={newAddress.provincia} onChange={(e) => setNewAddress({ ...newAddress, provincia: e.target.value })} required />
                            </div>
                            <div className="form-group" style={{ flex: 0.8 }}>
                                <label>C.P.</label>
                                <input type="text" placeholder="Ej: 5730" value={newAddress.codigoPostal} onChange={(e) => setNewAddress({ ...newAddress, codigoPostal: e.target.value })} required />
                            </div>
                        </div>

                        <div className="form-actions-flex">
                            <button type="submit" className="perfil-btn-save">
                                {editingAddressId ? 'Guardar Cambios' : 'Guardar Dirección'}
                            </button>
                            <button type="button" className="btn-cancel" onClick={cerrarFormularioDireccion}>Cancelar</button>
                        </div>
                    </form>
                </div>
            ) : (
                /* --- LISTADO DE DIRECCIONES --- */
                <div className="direcciones-grid">
                    {perfil?.direcciones?.map((dir, index) => {
                        const esUnica = perfil.direcciones.length === 1;
                        const esPrincipal = dir.esPrincipal || esUnica;

                        return (
                            <div className={`direccion-card-premium ${esPrincipal ? 'is-principal' : ''}`} key={dir._id || index}>
                                <div className="dir-icon-container">
                                    <FiMapPin />
                                </div>
                                <div className="dir-content">
                                    <h3 className="dir-title">
                                        {dir.calle} {dir.numero} {dir.pisoDepto && `- ${dir.pisoDepto}`}
                                    </h3>
                                    <p className="dir-text">Barrio {dir.barrio}</p>
                                    <p className="dir-text">{dir.ciudad}, {dir.provincia}</p>
                                    <p className="dir-text zip-code">CP: {dir.codigoPostal}</p>

                                    {esPrincipal && (
                                        <span className="badge-principal">Predeterminada</span>
                                    )}
                                </div>
                                <div className="dir-actions">
                                    {!esPrincipal && (
                                        <button type="button" className="btn-text-edit" onClick={() => setPrincipal(dir._id)}>
                                            Hacer Principal
                                        </button>
                                    )}
                                    <button type="button" className="btn-text-edit" onClick={() => handleEditClick(dir)}>
                                        Editar
                                    </button>
                                    <button type="button" className="btn-text-delete" onClick={() => handleDeleteClick(dir._id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    <div className="direccion-card-add" onClick={handleAddNewClick}>
                        <FiPlus className="add-icon" />
                        <p>Agregar nueva dirección</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Address;