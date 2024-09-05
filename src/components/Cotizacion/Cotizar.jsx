import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Cotizacion/Cotizar.css";

const Cotizar = ({
    allProducts,
    total,
    setTotal,
    countProducts,
    setCountProducts,
    setAllProducts,
    setActive, // Añadido para manejar el estado de visibilidad del carrito
}) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Escucha cambios en la ubicación y cierra el carrito al entrar en la página de cotización
    useEffect(() => {
        if (location.pathname === '/cotizar') {
            setActive(false);
        }
    }, [location.pathname, setActive]);

    const onDeleteProduct = (product) => {
        const updatedProducts = allProducts.filter(
            (item) => item.id_product !== product.id_product
        );
        setTotal(total - product.price * product.quantity);
        setCountProducts(countProducts - product.quantity);
        setAllProducts(updatedProducts);
    };

    const onCleanCart = () => {
        setAllProducts([]);
        setTotal(0);
        setCountProducts(0);
    };

    // Función para volver al carrito
    const handleBackToCart = () => {
        navigate('/'); // Navega a la página principal (Carrito)
    };

    return (
        <div className="cotizar-container">
            <h2>Revisión de Carrito</h2>
            {allProducts.length > 0 ? (
                <div className="cotizar-products-grid">
                    {allProducts.map((product) => (
                        <div key={product.id_product} className="cotizar-product">
                            <div className="cotizar-product-info">
                                <p className="cotizar-product-name">{product.name}</p>
                                <p>Cantidad: {product.quantity}</p>
                                <p>Precio: ${product.price}</p>
                            </div>
                            <button className="cotizar-product-delete" onClick={() => onDeleteProduct(product)}>
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <p>El carrito está vacío</p>
                    <button className="btn-back-to-cart" onClick={handleBackToCart}>
                        Volver al Carrito
                    </button>
                </>
            )}
            {allProducts.length > 0 && (
                <div className="cotizar-total">
                    <h3>Total a Pagar: ${total}</h3>
                    <button className="btn-clear-all" onClick={onCleanCart}>
                        Vaciar Carrito
                    </button>
                    <button className="btn-cotizar" onClick={() => alert("Función de pago aún no implementada")}>
                        Proceder al alquiler
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cotizar;
