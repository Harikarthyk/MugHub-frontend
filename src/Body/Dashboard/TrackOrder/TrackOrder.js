import React, { useEffect, useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import { getOrderForUserId, isAuthenticated } from '../../../helper/helper';
import './TrackOrder.css';
function TrackOrder() {
	const [orders, setOrders] = useState([]);
	const { user, token } = isAuthenticated();
	useEffect(() => {
		if (user)
			getOrderForUserId(user._id, token)
				.then((res) => {
					if (res.error) {
						console.log(res.error);
						return;
					}
					console.log(res.orders);
					setOrders(res.orders);
				})
				.catch((error) => console.log(error));
	}, []);
	const API = 'https://mughub-sample.herokuapp.com/api/';
	const ImageHelper = ({ product }) => {
		const imageurl = product
			? `${API}product/photo/${product._id}`
			: `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
		return (
			<div className="trackorder__imgWrapper">
				<img src={imageurl} alt="photo" />
			</div>
		);
	};
	if (!user) return <Redirect to="/" />;
	return (
		<div className="trackorder">
			<div className="trackorder__heading">Track your Orders</div>

			<div className="trackorder__pending">
				<div className="trackorder__pendingOrders">
					{orders.length === 0 ? <div>You have not ordered Anything</div> : ''}
					{orders.map((item, index) => {
						return (
							<div className="trackorder__listItem" key={item._id}>
								<div className="trackorder__orderNo">
									{index + 1}. Invoice Number : {item._id}
								</div>
								<div className="trackorder__itemsList">
									{item.purchases.map((i, j) => {
										return (
											<React.Fragment key={i._id}>
												<div className="trackorder__items">
													{j + 1}. <ImageHelper product={i.product} />
													<div className="trackorder__listName">
														{i.product.name}
													</div>
													<div className="trackorder__listPrice">
														{i.count} x {i.product.sellingPrice} ={' '}
														<FaRupeeSign />
														{Number(i.count) * Number(i.product.sellingPrice)}
													</div>
												</div>{' '}
											</React.Fragment>
										);
									})}
									<div
										className={
											item.status === 'Pending'
												? 'trackorder__status pending__status'
												: 'trackorder__status deliverd__status'
										}
									>
										Status :{' '}
										<strong>
											{console.log(item.status)}
											<i>{item.status}</i>
										</strong>
									</div>
									<div className="trackorder__totalAmt">
										<strong>Total Amount : </strong>
										<FaRupeeSign /> {item.amount}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default TrackOrder;
