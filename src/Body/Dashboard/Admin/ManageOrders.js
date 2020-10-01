import React, { useEffect, useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import {
	getAllOrders,
	isAuthenticated,
	updateOrderStatus,
} from '../../../helper/helper';
import './AdminDashBoard.css';
function ManageOrders() {
	const { user, token } = isAuthenticated();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const handleDeliverdProduct = (orderId) => {
		updateOrderStatus(orderId, user._id, token).then((res) => {
			if (res.error) {
				console.log(res.error);
				return;
			}
			console.log(res);
			preLoadOrder();
		});
	};

	const preLoadOrder = () => {
		getAllOrders(user._id, token)
			.then((res) => {
				if (res.error) {
					console.log(res.error);
					return;
				}
				setOrders(res.order);
				setLoading(false);
			})
			.catch((error) => console.log(error));
	};
	useEffect(() => {
		if (user) preLoadOrder();
	}, []);
	return (
		<div className="manageorders">
			<div className="manageorders__header">Manage Order</div>
			{loading ? 'Loading' : ''}
			{orders.map((order, index) => {
				return (
					<div key={order._id} className="manageorders__body">
						<div className="manageorders__id">
							{index + 1} . Invoice Number <strong> : {order._id}</strong>
						</div>
						<div className="manageorders__header">
							<div className="manageorders__userdetails">
								<div className="manageorders__username">
									Name : {order.user.name}
								</div>
								<div className="manageorders__usermail">
									Contact : {order.user.email}
								</div>
							</div>

							<div className="manageorders__amount">
								Total Amount :
								<FaRupeeSign />
								{order.amount}
							</div>
							<div>Address : {order.address}</div>
							<div className="manageorders__total">
								Total Products {order.purchases.length}
							</div>
							{order.status === 'Pending' ? (
								<button
									onClick={() => handleDeliverdProduct(order._id)}
									className="manageorder__deliverd"
								>
									If delivered Click here
								</button>
							) : (
								<div className="manageorder__deliverd">
									Product Deliverd Successfully
								</div>
							)}
						</div>
						<div className="manageorders__products">
							{order.purchases.map((product, i) => {
								return (
									<div
										key={product._id}
										className="manageordersProduct__product"
									>
										<div className="manageordersProduct__productHeading">
											<div className="manageordersProduct__productName">
												{i + 1} . {product.product.name}
											</div>

											<div className="manageordersProduct__productCount">
												{product.count} x <FaRupeeSign />
												{product.product.sellingPrice} = <FaRupeeSign />{' '}
												{product.count * product.product.sellingPrice}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ManageOrders;
