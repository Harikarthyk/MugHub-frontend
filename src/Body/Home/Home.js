import React, { useState, useEffect } from 'react';
import {
	getAllCategory,
	getAllProducts,
	getProductByCategory,
} from '../../helper/helper';
import './Home.css';
import { FaRupeeSign, FaShoppingBasket } from 'react-icons/fa';
import Popup from 'reactjs-popup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'reactjs-popup/dist/index.css';
function Home() {
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);
	const [category, setCategory] = useState('All');
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		preLoadProducts();
		preLoadCategory();
	}, []);
	useEffect(() => {
		setLoading(true);
		if (category == 'all') {
			preLoadProducts();
			return;
		}
		getProductByCategory(category)
			.then((res) => {
				if (res.error) {
					return;
				}
				setLoading(false);
				setProducts(res.products);
			})
			.catch((error) => console.log(error));
	}, [category]);
	const preLoadCategory = () => {
		getAllCategory()
			.then((res) => {
				if (res.error) {
					return;
				}
				setCategories(res.category);
			})
			.catch((error) => console.log(error));
	};
	const preLoadProducts = () => {
		getAllProducts()
			.then((res) => {
				if (res.error) {
					console.log(res.error);
					return;
				}
				setProducts(res.products);
				setLoading(false);
			})
			.catch((error) => console.error(error));
	};
	const API = 'https://mughub-sample.herokuapp.com/api/';

	const ImageHelper = ({ product }) => {
		const imageurl = product
			? `${API}product/photo/${product._id}`
			: `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
		return (
			<div className="cart_img_wrapper">
				<img src={imageurl} alt="photo" />
			</div>
		);
	};
	const addtoBasket = (product) => {
		let oldCartItem = JSON.parse(localStorage.getItem('cart')) || [];
		let check = oldCartItem.filter((cartItem) => cartItem._id === product._id);
		if (check.length === 0) {
			product.count = 1;
			oldCartItem.push(product);
		} else {
			oldCartItem.forEach((cartItem) => {
				if (cartItem._id === product._id) cartItem.count++;
			});
		}
		localStorage.setItem('cart', JSON.stringify(oldCartItem));
		toast.dark('Added to Cart');
	};

	return (
		<div className="home">
			<div className="home__caption">Support Independent Sellers at MuGHub</div>
			<div className="home__category col-8">
				<div className="home__categoryTitle"> Sort by</div>
				<select
					onChange={(e) => setCategory(e.target.value)}
					className="home__categorySelect"
					placeholder="Category"
				>
					<option key="All" value="all">
						All
					</option>
					{categories &&
						categories.map((cate, index) => (
							<option key={index} value={cate._id}>
								{cate.name}
							</option>
						))}
				</select>
			</div>
			{loading ? <div className="loading">Loading...</div> : ''}
			<div className="home__body">
				{products.map((product) => {
					return (
						<Popup
							key={product._id}
							trigger={
								<button>
									{' '}
									<div key={product._id} className="productImage">
										<ImageHelper product={product} />
										<div className="productImage__name">{product.name}</div>
										<div className="productImage__price">
											<div className="productImage__price1">
												<FaRupeeSign />{' '}
												{Math.floor(
													product.sellingPrice + product.sellingPrice / 2,
												)}
											</div>
											<div className="productImage__price2">
												<FaRupeeSign /> {product.sellingPrice}
											</div>
										</div>
									</div>
								</button>
							}
							position="top center"
							modal
						>
							{(close) => (
								<div style={{ width: '100% !importatn' }} className="popup">
									<a
										style={{ cursor: 'pointer' }}
										className="close"
										onClick={close}
									>
										&times;
									</a>
									<div className="popup__Image">
										<ImageHelper product={product} />
									</div>
									<div className="popup__body">
										<div className="popup__name">{product.name}</div>
										<div className="productImage__price">
											<div className="productImage__price1">
												<FaRupeeSign />{' '}
												{Math.floor(
													product.sellingPrice + product.sellingPrice / 2,
												)}
											</div>
											<div className="productImage__price2">
												<FaRupeeSign /> {product.sellingPrice}
											</div>
										</div>
										<div className="popup__des">{product.description}</div>

										<div
											className="popup__addtoCart"
											onClick={() => addtoBasket(product)}
										>
											Add to Cart
											<FaShoppingBasket />
										</div>
										<ToastContainer />
									</div>
								</div>
							)}
						</Popup>
					);
				})}
			</div>
		</div>
	);
}

export default Home;
