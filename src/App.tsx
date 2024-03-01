import { Route, Routes } from "react-router-dom"
import { Container } from "react-bootstrap"

//pages import
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import { About } from "./pages/About"

// components import
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/shoppingCartContext"

function App() {

  return (
    <>
    <ShoppingCartProvider>
    <Navbar />
    <Container className="">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Container>
    </ShoppingCartProvider>
    </>
  )
}

export default App
