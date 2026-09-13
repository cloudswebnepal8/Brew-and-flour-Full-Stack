import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import FloatButtons from './components/FloatButtons.jsx'
import ReservePill from './components/ReservePill.jsx'

import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import About from './pages/About.jsx'
import Gallery from './pages/Gallery.jsx'
import Reserve from './pages/Reserve.jsx'
import Contact from './pages/Contact.jsx'
import Order from './pages/Order.jsx'
import Blog from './pages/Blog.jsx'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<Order />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
      <ReservePill />
      <FloatButtons />
    </>
  )
}
