import React, { useEffect, useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated, placeOrder } from '../../helper/helper';
import './Order.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Order() {
	const { user, token } = isAuthenticated();
	const [items, setItems] = useState([]);
	const [redirect, setRedirect] = useState(false);
	const [address, setAddress] = useState('');
	useEffect(() => {
		let temp = JSON.parse(localStorage.getItem('cart')) || [];
		if (temp.length == 0) {
			setRedirect(false);
			return;
		}
		setItems(temp);
	}, []);
	const handleOrder = () => {
		alert('Placing Order');
		let temp = items.map((item) => {
			return {
				product: item._id,
				count: item.count,
			};
		});
		console.log({
			purchases: temp,
			amount: calculateTotalAmount(),
			user: user._id,
			address: address,
		});
		placeOrder(
			{
				purchases: temp,
				amount: calculateTotalAmount(),
				user: user._id,
				address: address,
			},
			user._id,
			token,
		)
			.then((res) => {
				if (res.error) {
					console.log(res.error);
					toast.dark(res.error);
					toast.dark('Make sure you enter your address');
					return;
				}
				localStorage.setItem('cart', JSON.stringify([]));
				toast.success('Order Placed Successfully');

				setRedirect(true);
			})
			.catch((error) => console.error(error));
	};
	const calculateTotalAmount = () => {
		let sum = items.reduce((a, c) => (a += c.sellingPrice * c.count), 0);
		return sum;
	};
	if (!user) return <Redirect to="/login" />;
	if (redirect) return <Redirect to="/track/order" />;
	return (
		<div className="order">
			<ToastContainer />
			<Link to="/cart">Back to Cart</Link>
			<div className="order__title">Your Order Summary</div>

			{items.map((item, index) => {
				return (
					<div className="order__listItem" key={item._id}>
						<div className="order__listIndex">{index + 1} .</div>
						<div className="order__listName">{item.name}</div>
						<div className="order__listPricr">
							{item.count} x {item.sellingPrice} = <FaRupeeSign />
							{item.count * item.sellingPrice}
						</div>
					</div>
				);
			})}
			<div className="order__total">
				Total Amount = <FaRupeeSign />
				{calculateTotalAmount()}
			</div>
			<div className="order__address">
				<div className="order__addressDistrict">
					(<strong>NOTE : </strong>Delivery Applicable in and around Coimbatore)
				</div>
				<div className="order__addressLine1">
					{' '}
					<label for="address">Address (with Phone number):</label>
					<textarea
						rows="3"
						cols="30"
						required
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						name="address"
						id="address"
					></textarea>
				</div>
			</div>
			<div className="order__placeButton" onClick={() => handleOrder()}>
				Place Order
			</div>
		</div>
	);
}

export default Order;
