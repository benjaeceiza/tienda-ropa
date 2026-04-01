import Footer from '../components/shared/footer/Footer';
import Navbar from '../components/shared/navbar/Navbar';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="layoutContainer">
      <Navbar />
      <main className="mainContent">
        {children}
      </main>
      <Footer/>
    </div>
  );
};

export default MainLayout;