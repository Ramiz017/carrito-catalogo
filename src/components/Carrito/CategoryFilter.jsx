import React, { useState, useEffect } from 'react';
import "../styles/Carrito/CategoryFilter.css";

const CategoryFilter = ({ categories, setFilteredProducts, allProducts, setSelectedCategory }) => {
    const [selectedCategory, setCategory] = useState("");

    useEffect(() => {
        setSelectedCategory(selectedCategory);
        const filterProducts = () => {
            if (selectedCategory) {
                const filtered = allProducts.filter(product => 
                    product.id_category === parseInt(selectedCategory, 10)
                );
                setFilteredProducts(filtered);
            } else {
                setFilteredProducts(allProducts);
            }
        };

        filterProducts();
    }, [selectedCategory, allProducts, setFilteredProducts, setSelectedCategory]);

    return (
        <div className="category-filter">
            <h3>Filtrar por Categoría</h3>
            <select
                value={selectedCategory}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Todas las Categorías</option>
                {categories.map(category => (
                    <option key={category.id_category} value={category.id_category}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryFilter;
