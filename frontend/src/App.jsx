import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import Home from './pages/home/Home'
import ListadoProductos from './pages/listado-productos/ListadoProductos'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import DetalleProducto from './pages/detalle-producto/DetalleProducto'
import ScrollToTop from './components/shared/ScrollToTop'
import { LoaderProvider } from './context/loader-context/LoaderContext'
import { CartProvider } from './context/cart-context/CartContext'
import Checkout from './pages/checkout/Checkout'
import { ToastProvider } from './context/toast-context/ToastContext'
import { AuthProvider } from './context/auth-context/AuthContext'
import { ProductProvider } from './context/product-context/ProductContext'
import MyProfile from './pages/my-profile/MyProfile'
import NotFound from './components/ui/not-found/NotFound'
import ProtectedRoute from './components/shared/ProtectedRoute'
import { UserProvider } from './context/user-context/UserContext'
import AdminLayout from './layouts/admin-layout/AdminLayout'
import AdminProtectedRoute from './components/shared/AdminProtectedRoute'
import CreateProduct from './pages/admin/products-admin/create-product/CreateProduct'
import AdminProducts from './pages/admin/products-admin/products/AdminProducts'
import ModifyProduct from './pages/admin/products-admin/modify-product/ModifyProduct'
// import Dashboard from './pages/admin/Dashboard'
// import AdminProtectedRoute from './components/shared/AdminProtectedRoute' 

function App() {
  return (
    <LoaderProvider>
      <AuthProvider>
        <UserProvider>
          <ProductProvider>
            <ToastProvider>
              <CartProvider>
                <BrowserRouter>
                  <ScrollToTop />
                  <Routes>

                    {/* =========================================
                        BLOQUE 1: LA TIENDA PÚBLICA (MainLayout) 
                        ========================================= */}
                    <Route element={<MainLayout />}>
                      <Route path='/login' element={<Login />} />
                      <Route path='/register' element={<Register />} />
                      <Route path='/' element={<Home />} />
                      <Route path='/productos/:categoria' element={<ListadoProductos />} />
                      <Route path='/producto/:id' element={<DetalleProducto />} />

                      {/* Rutas protegidas de cliente */}
                      <Route element={<ProtectedRoute />}>
                        <Route path='/perfil' element={<MyProfile />} />
                        <Route path='/checkout' element={<Checkout />} />
                      </Route>

                      <Route path="*" element={<NotFound />} />
                    </Route>

                    {/* =========================================
                        BLOQUE 2: EL PANEL DE ADMIN (AdminLayout)
                        ========================================= */}
                    <Route element={<AdminProtectedRoute />}>
                      <Route path="/admin" element={<AdminLayout />}>
                        {/* <Route index element={<Dashboard />} /> */}
                        <Route path='productos' element={<AdminProducts />} />
                        <Route path='productos/nuevo' element={<CreateProduct />} />
                        <Route path='productos/modify/:productId' element={<ModifyProduct />} />
                      </Route>
                    </Route>
                  </Routes>
                </BrowserRouter>
              </CartProvider>
            </ToastProvider>
          </ProductProvider>
        </UserProvider>
      </AuthProvider>
    </LoaderProvider>
  )
}

export default App