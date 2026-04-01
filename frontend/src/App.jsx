
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import Home from './views/home/Home'
import ListadoProductos from './views/listado-productos/ListadoProductos'

function App() {


  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/productos/:categoria' element={<ListadoProductos/>} />

          </Routes>
        </MainLayout>
      </BrowserRouter>

    </>
  )
}

export default App
