import Product from '../models/product.model.js';
import cloudinary from '../config/cloudinary.js';

export const createProduct = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Tenés que subir al menos una imagen para el producto." });
        }

        // ---  Función para subir a Cloudinary desde memoria ---
        const uploadToCloudinary = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'streteat_productos' }, // La carpeta donde se van a guardar
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result.secure_url); // Nos devuelve el link HTTPs
                    }
                );
                stream.end(buffer); // Le inyectamos el archivo
            });
        };

        // Subimos TODAS las fotos en paralelo (rapidísimo)
        const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
        const uploadedUrls = await Promise.all(uploadPromises);

        // --- DESTROZAMOS EL BODY ---
        const { nombre, descripcion, precio, categoria, stock, destacado, descuento } = req.body;

        if (!nombre || !descripcion || !precio || !categoria || !stock) {
            return res.status(400).json({ message: "Faltan campos obligatorios para crear el producto." });
        }

        // --- REPARTIMOS LAS URLs ---
        const imagenPrincipal = uploadedUrls[0]; // La primera que subió
        const imagenesAdicionales = uploadedUrls.slice(1); // El resto (si hay)

        const stockParseado = JSON.parse(stock);

        const newProduct = new Product({
            nombre,
            descripcion,
            precio: Number(precio),
            categoria,
            stock: stockParseado,
            destacado: destacado === 'true',
            descuento: Number(descuento) || 0,
            imagen: imagenPrincipal,
            imagenes: imagenesAdicionales
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({
            message: "¡Producto creado con éxito, rey!",
            product: savedProduct
        });

    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ message: "Error interno del servidor al crear el producto." });
    }
};


// Trae todos los productos
export const getAdminProducts = async (req, res) => {
    try {

        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ message: "Error al cargar la lista de productos." });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Buscamos el producto en la base de datos por su ID
        const producto = await Product.findById(id);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Devolvemos el producto en formato JSON (esto es lo que espera el frontend)
        res.status(200).json(producto);

    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({ message: 'Error interno al buscar el producto', error: error.message });
    }
};


// Funcion para eliminar un producto
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscamos y eliminamos el producto de MongoDB
        const productoEliminado = await Product.findByIdAndDelete(id);

        if (!productoEliminado) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // --- LÓGICA DE LIMPIEZA EN CLOUDINARY ---
        // Verificamos si el producto tenía un array de imágenes guardadas
        if (productoEliminado.imagenes && productoEliminado.imagenes.length > 0) {

            // Usamos Promise.all para borrar todas las imágenes en paralelo (es mucho más rápido)
            await Promise.all(productoEliminado.imagenes.map(async (imageUrl) => {

                try {
                    // Magia para extraer el public_id de cualquier URL de Cloudinary
                    // Cortamos la URL por '/upload/', sacamos la versión (v12345/) y quitamos la extensión (.jpg, .png)
                    const publicId = imageUrl
                        .split('/upload/')[1]
                        .replace(/v\d+\//, '')
                        .split('.')[0];

                    // Le pegamos a la API de Cloudinary para que la destruya
                    await cloudinary.uploader.destroy(publicId);

                } catch (imgError) {
                    // Si falla una imagen por algún motivo, lo logueamos pero no frenamos todo el proceso
                    console.error(`Error al borrar imagen ${imageUrl} de Cloudinary:`, imgError);
                }

            }));
        }

        res.status(200).json({ message: 'Producto y sus imágenes eliminados permanentemente' });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ message: 'Error interno al eliminar el producto', error: error.message });
    }
};


export const toggleProductStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { activo } = req.body; 

        // Actualizamos solo el campo "activo"
        const productoActualizado = await Product.findByIdAndUpdate(
            id,
            { activo: activo },
            { new: true } 
        );

        if (!productoActualizado) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({
            message: activo ? 'Producto activado' : 'Producto archivado',
            producto: productoActualizado
        });
    } catch (error) {
        console.error("Error al cambiar estado:", error);
        res.status(500).json({ message: 'Error interno al cambiar el estado', error: error.message });
    }
};

// --- EDITAR / ACTUALIZAR PRODUCTO ---
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        // 1. Extraemos los campos de texto básicos
        const { nombre, descripcion, precio, descuento, categoria, destacado } = req.body;

        // 2. Parseamos los campos que el frontend mandó como JSON string
        let stockParsed = {};
        if (req.body.stock) {
            stockParsed = JSON.parse(req.body.stock);
        }

        let imagenesFinales = [];
        if (req.body.imagenesExistentes) {
            imagenesFinales = JSON.parse(req.body.imagenesExistentes);
        }

        // 3. Manejo de las imágenes NUEVAS (Asumiendo que usás Multer + Cloudinary)
        // Si multer subió los archivos, vienen en req.files. 
        // Extraemos las URLs seguras que nos devuelve Cloudinary.
      if (req.files && req.files.length > 0) {
            const nuevasUrls = req.files.map(file => file.path); 
            imagenesFinales = [...imagenesFinales, ...nuevasUrls]; 
        }

        // --- LA CORRECCIÓN MÁGICA ESTÁ ACÁ ---
        const fotoPortada = imagenesFinales[0] || '';
        const fotosGaleria = imagenesFinales.slice(1); // Guardamos todas MENOS la primera

        // 4. Actualizamos el documento en MongoDB
        const productoActualizado = await Product.findByIdAndUpdate(
            id,
            {
                nombre,
                descripcion,
                precio: Number(precio),
                descuento: Number(descuento),
                categoria,
                destacado: destacado === 'true',
                stock: stockParsed,
                imagen: fotoPortada,    // <--- Solo el string de la foto principal
                imagenes: fotosGaleria  // <--- El array con el RESTO de las fotos
            },
            { new: true }
        );

        if (!productoActualizado) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ 
            message: 'Producto actualizado exitosamente', 
            producto: productoActualizado 
        });

    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ message: 'Error interno al actualizar', error: error.message });
    }
};