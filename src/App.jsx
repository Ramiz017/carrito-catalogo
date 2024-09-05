import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Carrito/Header";
import { ProductList } from "./components/Carrito/ProductList";
import Cotizar from "./components/Cotizacion/Cotizar";

function App() {
    const [allProducts, setAllProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [countProducts, setCountProducts] = useState(0);
    const [active, setActive] = useState(false); // Estado para manejar la visibilidad del carrito

    return (
        <Router>
            <Header
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
                setActive={setActive}
                active={active}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProductList
                            allProducts={allProducts}
                            setAllProducts={setAllProducts}
                            total={total}
                            setTotal={setTotal}
                            countProducts={countProducts}
                            setCountProducts={setCountProducts}
                            setActive={setActive}
                        />
                    }
                />
                <Route
                    path="/cotizar"
                    element={
                        <Cotizar
                            allProducts={allProducts}
                            setAllProducts={setAllProducts}
                            total={total}
                            setTotal={setTotal}
                            countProducts={countProducts}
                            setCountProducts={setCountProducts}
                            setActive={setActive}
                        />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
