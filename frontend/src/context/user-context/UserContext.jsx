import { createContext, useState, useContext, useEffect } from 'react';
import axios from '../../api/axios';
import { useAuth } from '../auth-context/AuthContext';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Escuchamos si el usuario está logueado o no
    const { isAuthenticated } = useAuth();

    const [perfil, setPerfil] = useState(null);
    const [loadingPerfil, setLoadingPerfil] = useState(false);

    // Cada vez que el isAuthenticated cambie (ej: te logueaste), busca el perfil.
    // Si te deslogueas (pasa a false), limpia el perfil para que no queden datos fantasma.
    useEffect(() => {
        if (isAuthenticated) {
            getPerfilCompleto();
        } else {
            setPerfil(null);
        }
    }, [isAuthenticated]);


    // Función para traer todo de la base de datos
    const getPerfilCompleto = async () => {
        setLoadingPerfil(true);
        try {
            const res = await axios.get('/users/profile');
            setPerfil(res.data);
        } catch (error) {
            console.error("Error al traer el perfil del usuario:", error);
        } finally {
            setLoadingPerfil(false);
        }
    };


    // Función para actualizar datos y pisar el estado local al instante
    const updateDatosPersonales = async (nuevosDatos) => {
        try {
            const res = await axios.put('/users/profile', nuevosDatos);
            setPerfil((prev) => ({ ...prev, ...res.data }));
            return { success: true };
        } catch (error) {

            const errorMsg = error.response?.data?.message || "Error al actualizar perfil";
            return { success: false, message: errorMsg }; // Devolvemos el mensaje
        }
    };

    // Función para agregar dirección
    const addAddress = async (nuevaDireccion) => {
        try {
            const res = await axios.post('/users/profile/address', nuevaDireccion);
            setPerfil(res.data);
            return { success: true };
        } catch (error) {
            return { success: false };
        }
    };

    // Función para fijar como principal
    const setPrincipal = async (idDireccion) => {
        try {
            const res = await axios.put(`/users/profile/address/${idDireccion}/principal`);
            setPerfil(res.data); // Se actualiza la UI sola
            return { success: true };
        } catch (error) {
            return { success: false };
        }
    };

    // Eliminar dirección
    const removeAddress = async (idDireccion) => {
        try {
            const res = await axios.delete(`/users/profile/address/${idDireccion}`);
            setPerfil(res.data); // Actualiza la UI
            return { success: true };
        } catch (error) {
            return { success: false };
        }
    };

    // Editar dirección
    const editAddress = async (idDireccion, datosActualizados) => {
        try {
            const res = await axios.put(`/users/profile/address/${idDireccion}`, datosActualizados);
            setPerfil(res.data); // Actualiza la UI
            return { success: true };
        } catch (error) {
            return { success: false };
        }
    };



    const removeFavorito = async (idProducto) => {
        try {
            const res = await axios.delete(`/users/profile/favorites/${idProducto}`);
            setPerfil(res.data); // Actualiza la UI al instante
            return { success: true };
        } catch (error) {
            return { success: false, message: "Error al eliminar" };
        }
    };


    const addFavorito = async (idProducto) => {
        try {
            const res = await axios.post('/users/profile/favorites', { idProducto });
            setPerfil(res.data); // Actualiza la UI al instante
            return { success: true };
        } catch (error) {
            return { success: false, message: "Error al agregar a favoritos" };
        }
    };


    return (
        <UserContext.Provider
            value={{
                perfil,
                loadingPerfil,
                getPerfilCompleto,
                updateDatosPersonales,
                addAddress,
                setPrincipal,
                removeAddress,
                editAddress,
                removeFavorito,
                addFavorito
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser debe usarse dentro de un UserProvider");
    return context;
};