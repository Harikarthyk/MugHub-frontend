import React, { useContext, useEffect, useState } from 'react';
import './NavBar.css';
import logo from '../../mugHub.jpg';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserCog, FaUserTag } from 'react-icons/fa';
import { isAuthenticated, logout } from '../../helper/helper';
import UserContext from '../../UserContext';
function NavBar() {
	const context = useContext(UserContext);
	const { user, setUser } = context;
	useEffect(() => {
		let { user } = isAuthenticated();
		if (user) {
			setUser(user);
		} else setUser(false);
	}, []);
	// const handleLogout = () => {
	// 	logout()
	// 		.then((res) => {
	// 			if (res.error) {
	// 				console.log(res.error);
	// 				return;
	// 			}
	// 			setUser(null);
	// 		})
	// 		.catch((error) => console.log(error));
	// };
	return (
		<div className="navbar">
			<div className="navbar__left">
				<Link className="navbar__leftHeader" to="/">
					<img src={logo} alt="logo" />
				</Link>
				<div className="navbar__leftTabs">
					<Link className="navbar__tabs" style={{ color: 'white' }} to="/">
						Home
					</Link>
					<Link
						style={{ color: 'white' }}
						style={{ fontSize: '16px', color: 'white' }}
						className="navbar__tabs "
						to="/cart"
					>
						<FaShoppingCart />
					</Link>
					<Link
						style={{ color: 'white' }}
						className="navbar__tabs"
						to="/track/order"
					>
						Track Orders
					</Link>
				</div>
			</div>
			<div className="navbar__right">
				{user ? (
					<Link to="/dashboard" className="navbar__loginButton">
						<FaUserCog style={{ color: 'white', fontSize: '18px' }} />
					</Link>
				) : (
					<Link to="/login">
						<div className="navbar__loginButton">Login</div>
					</Link>
				)}
			</div>
		</div>
	);
}

export default NavBar;
