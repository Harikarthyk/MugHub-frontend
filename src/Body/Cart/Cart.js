import React, { useEffect, useState } from 'react';
import { FaRupeeSign, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Cart.css';
function Cart() {
	const [cartItem, setCartItem] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);
	useEffect(() => {
		preLoadCartItem();
	}, []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cartItem));
		calculateTotalAmount();
	}, [cartItem]);
	const calculateTotalAmount = () => {
		let sum = cartItem.reduce((a, c) => (a += c.sellingPrice * c.count), 0);
		setTotalAmount(sum);
	};
	const preLoadCartItem = () => {
		let cart = JSON.parse(localStorage.getItem('cart')) || [];
		setCartItem(cart);
		calculateTotalAmount();
	};
	const API = 'https://mughub-sample.herokuapp.com/api/';

	const ImageHelper = ({ product }) => {
		const imageurl = product
			? `${API}product/photo/${product._id}`
			: `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
		return (
			<div className="cartItem_img_wrapper">
				<img src={imageurl} alt="photo" />
			</div>
		);
	};
	const shortenDescription = (s) => {
		s = s.split('');
		s = s.slice(0, 120);
		return s.join('') + '...';
	};
	const removeFromCart = (item) => {
		let cart = JSON.parse(localStorage.getItem('cart')) || [];
		let temp = cart.filter((i) => i._id !== item._id);
		setCartItem(temp);
	};
	return (
		<div className="cart">
			<div className="cart__heading">Your Shopping Cart</div>

			{!cartItem || cartItem.length === 0 ? (
				<div className="cart__bodyEmptyImage">
					<img
						src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg"
						alt="empty"
					/>
				</div>
			) : (
				<div className="cart__bodyItem">
					<div className="cartBodyItem_">
						{cartItem.map((item) => {
							return (
								<div className="cart__item" key={item._id}>
									<div className="cart__itemImage">
										<ImageHelper product={item} />
									</div>
									<div className="cart__itemDetails">
										<div className="cart__itemName">{item.name}</div>
										<div className="productImage__price">
											<div className="productImage__price1">
												<FaRupeeSign />{' '}
												{Math.floor(item.sellingPrice + item.sellingPrice / 2)}
											</div>
											<div className="productImage__price2">
												<FaRupeeSign /> {item.sellingPrice}
											</div>
										</div>
										<div className="cart__itemDetailsDes">
											<i>{shortenDescription(item.description)}</i>
										</div>
										<div className="cart_itemDetailInner">
											{' '}
											<input
												className="cart_itemDetailCount"
												type="number"
												min={1}
												max={item.stock}
												value={item.count}
												onChange={(e) => {
													let cart = cartItem;
													let product = cart.map((c) => {
														if (c._id === item._id) {
															c.count = e.target.value;
														}

														return c;
													});
													setCartItem(product);
												}}
											/>
											<button
												onClick={() => {
													removeFromCart(item);
												}}
												className="cart_itemRemoveButton"
											>
												Remove from Cart
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<div className="cart__buyNow">
						<div className="cart__buyNowHeading">Your Cart Summary</div>
						<div className="cart__buyNowSummary">
							Subtotal({cartItem.length} items) : <FaRupeeSign /> {totalAmount}
						</div>
						<Link to="/place/order" className="cart__buyNowButton">
							Proceed to Buy <FaShoppingCart />
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}

export default Cart;
