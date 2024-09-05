import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header = ({
    allProducts,
    setAllProducts,
    total = 0,
    countProducts,
    setCountProducts,
    setTotal,
    setActive,
    active
}) => {
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Escucha cambios en la ubicación y cierra el carrito cuando se está en la página de catálogo
    useEffect(() => {
        if (location.pathname === '/') {
            setActive(false);
        }
    }, [location.pathname, setActive]);

    const onDeleteProduct = product => {
        const updatedProducts = allProducts.filter(item => item.id_product !== product.id_product);
        setTotal(total - product.price * product.quantity);
        setCountProducts(countProducts - product.quantity);
        setAllProducts(updatedProducts);
    };

    const onCleanCart = () => {
        setAllProducts([]);
        setTotal(0);
        setCountProducts(0);
    };

    const handleShowAll = () => {
        setShowAll(!showAll);
    };

    const handleNavigate = () => {
        if (location.pathname === '/cotizar') {
            navigate('/'); // Navega a la página principal
        } else {
            navigate('/cotizar'); // Navega a la página de cotizar
        }
        setActive(false); // Cierra el carrito al navegar
    };

    return (
        <header>
            <h1>Carrito Aguamarina</h1>
            <div className='container-icon'>
                <div
                    className='container-cart-icon'
                    onClick={() => setActive(!active)}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='icon-cart'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' />
                    </svg>
                    <div className='count-products'>
                        <span id='contador-productos'>{countProducts}</span>
                    </div>
                </div>
                <div
                    className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
                    {allProducts.length ? (
                        <>
                            <div className='row-product'>
                                {allProducts.slice(0, showAll ? allProducts.length : 3).map(product => (
                                    <div className='cart-product' key={product.id_product}>
                                        <div className='info-cart-product'>
                                            <span className='cantidad-producto-carrito'>
                                                {product.quantity}
                                            </span>
                                            <p className='titulo-producto-carrito'>
                                                {product.name}
                                            </p>
                                            <span className='precio-producto-carrito'>
                                                ${product.price}
                                            </span>
                                        </div>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth='1.5'
                                            stroke='currentColor'
                                            className='icon-close'
                                            onClick={() => onDeleteProduct(product)}>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M6 18L18 6M6 6l12 12' />
                                        </svg>
                                    </div>
                                ))}
                            </div>

                            {allProducts.length > 3 && (
                                <button className='btn-toggle-products' onClick={handleShowAll}>
                                    {showAll ? 'Mostrar menos' : 'Mostrar más'}
                                </button>
                            )}

                            <div className='cart-total'>
                                <h3>Total:</h3>
                                <span className='total-pagar'>${total}</span>
                            </div>

                            <button className='btn-clear-all' onClick={onCleanCart}>
                                Vaciar Carrito
                            </button>

                            {/* Botón de Cotizar o Volver a Carrito */}
                            <button className='btn-cotizar' onClick={handleNavigate}>
                                {location.pathname === '/cotizar' ? 'Volver a Carrito' : 'Cotizar'}
                            </button>
                        </>
                    ) : (
                        <p className='cart-empty'>El carrito está vacío</p>
                    )}
                </div>
            </div>
        </header>
    );
};
