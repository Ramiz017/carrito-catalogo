import { useEffect, useState } from "react";
import PriceFilter from "./PriceFilter";
import NameFilter from "./NameFilter";
import CategoryFilter from "./CategoryFilter";
import "../styles/Carrito/ProductList.css";

export const ProductList = ({
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal,
}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isPriceFilterVisible, setIsPriceFilterVisible] = useState(false);
    const [isNameFilterVisible, setIsNameFilterVisible] = useState(false);
    const [isCategoryFilterVisible, setIsCategoryFilterVisible] = useState(false);
    const [priceRange, setPriceRange] = useState([0, Infinity]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    useEffect(() => {
        if (products.length > 0) {
            let filtered = [...products];

            if (selectedCategory) {
                filtered = filtered.filter(product =>
                    product.id_category === parseInt(selectedCategory, 10)
                );
            }
            if (searchTerm) {
                filtered = filtered.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            if (priceRange[0] > 0 || priceRange[1] < Infinity) {
                filtered = filtered.filter(
                    product => product.price >= priceRange[0] && product.price <= priceRange[1]
                );
            }
            setFilteredProducts(filtered);
        }
    }, [searchTerm, priceRange, selectedCategory, products]);

    const fetchProducts = async () => {
        try {
            const response = await fetch("https://aguamarina-api-mysql.onrender.com/api/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
            );
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://aguamarina-api-mysql.onrender.com/api/categories', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const onAddProduct = (product) => {
        const existingProduct = allProducts.find(
            (item) => item.id_product === product.id_product
        );
        if (existingProduct) {
            const updatedProducts = allProducts.map((item) =>
                item.id_product === product.id_product
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setAllProducts(updatedProducts);
            setTotal(parseFloat(total) + parseFloat(product.price));
            setCountProducts(countProducts + 1);
        } else {
            const newProduct = { ...product, quantity: 1 };
            setAllProducts([...allProducts, newProduct]);
            setTotal(parseFloat(total) + parseFloat(product.price));
            setCountProducts(countProducts + 1);
        }
    };

    const getCategoryName = (id_category) => {
        const category = categories.find(cat => cat.id_category === id_category);
        return category ? category.name : "Categoría desconocida";
    };

    return (
        <div className="product-list-container">
            <div className="filters-container">
                <button
                    className={`filter-toggle ${isPriceFilterVisible ? 'active' : 'inactive'}`}
                    onClick={() => setIsPriceFilterVisible(!isPriceFilterVisible)}
                >
                    {isPriceFilterVisible ? "No Filtrar Precio" : "Filtrar Precio"}
                </button>
                {isPriceFilterVisible && (
                    <PriceFilter
                        products={products}
                        setFilteredProducts={(filtered) => setFilteredProducts(filtered)}
                        setPriceRange={setPriceRange}
                    />
                )}
                <button
                    className={`filter-toggle ${isNameFilterVisible ? 'active' : 'inactive'}`}
                    onClick={() => setIsNameFilterVisible(!isNameFilterVisible)}
                >
                    {isNameFilterVisible ? "No Filtrar Nombre" : "Filtrar Nombre"}
                </button>
                {isNameFilterVisible && (
                    <NameFilter
                        products={products}
                        setFilteredProducts={(filtered) => setFilteredProducts(filtered)}
                        setSearchTerm={setSearchTerm}
                    />
                )}
                <button
                    className={`filter-toggle ${isCategoryFilterVisible ? 'active' : 'inactive'}`}
                    onClick={() => setIsCategoryFilterVisible(!isCategoryFilterVisible)}
                >
                    {isCategoryFilterVisible ? "No Filtrar Categoría" : "Filtrar Categoría"}
                </button>
                {isCategoryFilterVisible && (
                    <CategoryFilter
                        categories={categories}
                        setFilteredProducts={(filtered) => setFilteredProducts(filtered)}
                        allProducts={products}
                        setSelectedCategory={setSelectedCategory}
                    />
                )}
            </div>
            <div className="container-items">
                {filteredProducts.map((product) => (
                    <div className="item" key={product.id_product}>
                        <figure>
                            <img src={product.img} alt={product.name} />
                        </figure>
                        <div className="info-product">
                            <h2>{product.name}</h2>
                            <h3>{getCategoryName(product.id_category)}</h3>
                            <p className="price">${product.price}</p>
                            <button onClick={() => onAddProduct(product)}>
                                Añadir al carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
