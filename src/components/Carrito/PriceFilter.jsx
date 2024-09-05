import { useState, useEffect } from 'react';
import Slider from 'react-slider';
import '../styles/Carrito/PriceFilter.css';

const PriceFilter = ({ products, setFilteredProducts, setPriceRange }) => {
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(1000);
	const [maxAvailablePrice, setMaxAvailablePrice] = useState(1000);

	useEffect(() => {
		const highestPrice = Math.max(...products.map((product) => product.price));
		setMaxAvailablePrice(highestPrice);
		setMaxPrice(highestPrice);
	}, [products]);

	useEffect(() => {
		setPriceRange([minPrice, maxPrice]);
		const filtered = products.filter(
			(product) => product.price >= minPrice && product.price <= maxPrice
		);
		setFilteredProducts(filtered);
	}, [minPrice, maxPrice, products, setFilteredProducts, setPriceRange]);

	return (
		<div className='price-filter'>
			<h2>Filtrar por Precio</h2>
			<Slider
				className='horizontal-slider'
				thumbClassName='slider-thumb'
				trackClassName='slider-track'
				min={0}
				max={maxAvailablePrice}
				value={[minPrice, maxPrice]}
				onChange={([min, max]) => {
					setMinPrice(min);
					setMaxPrice(max);
				}}
				ariaLabel={['Precio mínimo', 'Precio máximo']}
			/>
			<div className='price-range-values'>
				<span>Min: ${minPrice}</span>
				<span>Max: ${maxPrice}</span>
			</div>
		</div>
	);
};

export default PriceFilter;
