import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/auth-context/AuthContext';
import { useUser } from '../../context/user-context/UserContext';
import { useToast } from '../../context/toast-context/ToastContext';
import { FiUser, FiMapPin, FiShoppingBag, FiHeart, FiLock, FiLogOut, FiPlus, FiTrash2 } from 'react-icons/fi';
import './MyProfile.css';
import UserInfo from './user-info/UserInfo';
import Favorites from './favorites/Favorites';
import Address from './address/Address';
import ResetPasswordProfile from './reset-password/ResetPasswordProfile';

const MyProfile = () => {

    const { logout } = useAuth();
    const { perfil, loadingPerfil, updateDatosPersonales, addAddress, setPrincipal, removeAddress, editAddress } = useUser();
    const { showToast } = useToast();
    const [searchParams, setSearchParams] = useSearchParams();

    const initialTab = searchParams.get('tab') || 'datos';
    const [activeTab, setActiveTab] = useState(initialTab);

    // Estados para el formulario de agregar/editar dirección
    const emptyAddress = { calle: '', numero: '', pisoDepto: '', barrio: '', ciudad: '', provincia: '', codigoPostal: '' };
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState(emptyAddress);
    const [editingAddressId, setEditingAddressId] = useState(null);

    // Estado para los datos personales
    const [formData, setFormData] = useState({
        nombre: '', apellido: '', email: '', telefono: '',
    });

    // Sincronizar datos de perfil con el formulario
    useEffect(() => {
        if (perfil) {
            setFormData({
                nombre: perfil.nombre || '',
                apellido: perfil.apellido || '',
                email: perfil.email || '',
                telefono: perfil.telefono || ''
            });
        }
    }, [perfil]);

    // Leer la pestaña desde la URL
    useEffect(() => {
        const tabParam = searchParams.get('tab');
        if (tabParam) setActiveTab(tabParam);
    }, [searchParams]);

    // --- MANEJADORES GLOBALES ---
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchParams({ tab });
        cerrarFormularioDireccion(); // Cierra el form si cambiás de pestaña
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGuardarDatos = async (e) => {
        e.preventDefault();
        const res = await updateDatosPersonales({
            nombre: formData.nombre, apellido: formData.apellido, telefono: formData.telefono
        });

        if (res.success) {
            showToast("Datos actualizados correctamente", "success");
        } else {
            showToast(res.message, "error");
        }
    };

    // --- MANEJADORES DE DIRECCIONES ---
    const cerrarFormularioDireccion = () => {
        setShowAddressForm(false);
        setEditingAddressId(null);
        setNewAddress(emptyAddress);
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();

        let res;
        if (editingAddressId) {
            res = await editAddress(editingAddressId, newAddress);
            if (res.success) showToast("Dirección actualizada", "success");
        } else {
            res = await addAddress(newAddress);
            if (res.success) showToast("Dirección agregada", "success");
        }

        if (res.success) {
            cerrarFormularioDireccion();
        } else {
            showToast("Hubo un error al guardar", "error");
        }
    };

    const handleAddNewClick = () => {
        setEditingAddressId(null);
        setNewAddress(emptyAddress);
        setShowAddressForm(true);
    };

    const handleEditClick = (dir) => {
        setNewAddress(dir);
        setEditingAddressId(dir._id);
        setShowAddressForm(true);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm("¿Seguro que querés eliminar esta dirección?")) {
            const res = await removeAddress(id);
            if (res.success) showToast("Dirección eliminada");
        }
    };

    // --- PANTALLA DE CARGA ---
    if (loadingPerfil || !perfil) {
        return <div className="perfil-container"><h2 style={{ textAlign: 'center', marginTop: '50px' }}>Cargando tu perfil...</h2></div>;
    }

    return (
        <section className="perfil-container">
            <div className="perfil-header desktop-only">
                <h1 className="perfil-title">MI CUENTA</h1>
            </div>

            <div className="perfil-layout">
                {/* --- SIDEBAR DESKTOP (Se oculta en mobile) --- */}
                <aside className="perfil-sidebar desktop-only">
                    <div className="perfil-user-info">
                        <div className="perfil-avatar">
                            {perfil?.nombre ? perfil.nombre.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <p className="perfil-greeting">Hola, <span>{perfil?.nombre || 'Usuario'}</span></p>
                    </div>

                    <nav className="perfil-nav">
                        <button className={activeTab === 'datos' ? 'active' : ''} onClick={() => handleTabChange('datos')}>
                            <FiUser /> Mis Datos
                        </button>
                        <button className={activeTab === 'direcciones' ? 'active' : ''} onClick={() => handleTabChange('direcciones')}>
                            <FiMapPin /> Direcciones
                        </button>
                        <button className={activeTab === 'compras' ? 'active' : ''} onClick={() => handleTabChange('compras')}>
                            <FiShoppingBag /> Mis Compras
                        </button>
                        <button className={activeTab === 'favoritos' ? 'active' : ''} onClick={() => handleTabChange('favoritos')}>
                            <FiHeart /> Favoritos
                        </button>
                        <button className={activeTab === 'seguridad' ? 'active' : ''} onClick={() => handleTabChange('seguridad')}>
                            <FiLock /> Seguridad
                        </button>
                    </nav>

                    <button className="perfil-btn-logout" onClick={logout}>
                        <FiLogOut /> Cerrar Sesión
                    </button>
                </aside>


                {/* --- CONTENIDO DINÁMICO --- */}
                <main className="perfil-content">

                    {/* PESTAÑA: MIS DATOS */}
                    {activeTab === 'datos' &&
                        <UserInfo formData={formData} handleInputChange={handleInputChange} handleGuardarDatos={handleGuardarDatos} logout={logout} />
                    }

                    {/* PESTAÑA: DIRECCIONES */}
                    {activeTab === 'direcciones' && (
                        <Address showAddressForm={showAddressForm}
                            editingAddressId={editingAddressId}
                            newAddress={newAddress} setNewAddress={setNewAddress}
                            handleAddressSubmit={handleAddressSubmit}
                            cerrarFormularioDireccion={cerrarFormularioDireccion}
                            handleAddNewClick={handleAddNewClick}
                            setPrincipal={setPrincipal}
                            handleEditClick={handleEditClick}
                            handleDeleteClick={handleDeleteClick}/>

                    )}

                    {/* Las demas pestañas (Compras, Favoritos, Seguridad) */}
                    {activeTab === 'compras' && (<div className="tab-pane fade-in"><h2>Mis Compras</h2><p>Próximamente...</p></div>)}

                    {/* PESTAÑA: FAVORITOS */}
                    {activeTab === 'favoritos' &&
                        <Favorites perfil={perfil} />
                    }
                    {activeTab === 'seguridad' && <ResetPasswordProfile/>}

                </main>
            </div>

            {/* =========================================
                📱 NAVBAR INFERIOR (SÓLO MOBILE)
                ========================================= */}
            <nav className="bottom-navbar mobile-only">
                <button className={`nav-pill ${activeTab === 'datos' ? 'active' : ''}`} onClick={() => handleTabChange('datos')}>
                    <FiUser />
                </button>
                <button className={`nav-pill ${activeTab === 'direcciones' ? 'active' : ''}`} onClick={() => handleTabChange('direcciones')}>
                    <FiMapPin />
                </button>
                <button className={`nav-pill ${activeTab === 'compras' ? 'active' : ''}`} onClick={() => handleTabChange('compras')}>
                    <FiShoppingBag />
                </button>
                <button className={`nav-pill ${activeTab === 'favoritos' ? 'active' : ''}`} onClick={() => handleTabChange('favoritos')}>
                    <FiHeart />
                </button>
                <button className={`nav-pill ${activeTab === 'seguridad' ? 'active' : ''}`} onClick={() => handleTabChange('seguridad')}>
                    <FiLock />
                </button>
            </nav>
        </section>
    );
};

export default MyProfile;