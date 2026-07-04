import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import AdminMessages from './pages/AdminMessages';
import './App.css';

function OnePage() {
  return (
    <>
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<OnePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;