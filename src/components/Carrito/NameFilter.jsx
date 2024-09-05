import React, { useState } from "react";
import "../styles/Carrito/NameFilter.css";

const NameFilter = ({ products, setFilteredProducts, setSearchTerm }) => {
    const [search, setSearch] = useState("");

    const handleSearchChange = (event) => {
        const term = event.target.value.toLowerCase();
        setSearch(term);
        setSearchTerm(term);

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(term)
        );

        setFilteredProducts(filtered);
    };

    return (
        <div className="name-filter">
            <input
                type="text"
                placeholder="Buscar por nombre..."
                value={search}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default NameFilter;
