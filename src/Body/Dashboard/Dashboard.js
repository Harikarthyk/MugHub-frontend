import React, { useContext, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import { isAdmin, isAuthenticated, logout } from '../../helper/helper';
import UserContext from '../../UserContext';
import './Dashboard.css';
const Dashboard = () => {
	const { user } = isAuthenticated();
	const context = useContext(UserContext);
	const [redirect, setRedirect] = useState(false);
	const handleLogout = () => {
		logout()
			.then((res) => {
				if (res.error) {
					console.log(res.error);
					return;
				}
				context.setUser(null);
			})
			.catch((error) => console.log(error));
	};
	const adminLeftSide = () => {
		return (
			<div className="card">
				<b className="card-header bg-dark text-white">Admin Navigation</b>
				{!isAdmin() ? (
					<ul className="list-group">
						<li onClick={handleLogout} className="list-group-item noPaddig">
							<Link
								to="/admin/create/category"
								className="nav-link text-success"
							>
								Logout
							</Link>
						</li>
					</ul>
				) : (
					<ul className="list-group">
						<li className="list-group-item noPaddig">
							<Link
								to="/admin/create/category"
								className="nav-link text-success"
							>
								Create Categories
							</Link>
						</li>
						<li className="list-group-item noPaddig">
							<Link
								to="/admin/manage/category"
								className="nav-link text-success"
							>
								Manage Category
							</Link>
						</li>

						<li className="list-group-item noPaddig">
							<Link
								to="/admin/create/product"
								className="nav-link text-success"
							>
								Create Product
							</Link>
						</li>
						<li className="list-group-item noPaddig">
							<Link
								to="/admin/manage/products"
								className="nav-link text-success"
							>
								Manage Products
							</Link>
						</li>

						<li className="list-group-item noPaddig">
							<Link to="/admin/manage/orders" className="nav-link text-success">
								Manage Orders
							</Link>
						</li>
					</ul>
				)}
			</div>
		);
	};

	const adminRightSide = () => {
		return (
			<div className="card mb-4">
				<b className="card-header bg-dark">Admin Information</b>
				<ul className="list-group">
					<li className="list-group-item">
						<span className="badge badge-success mr-2">Name:</span> {user.name}{' '}
						{'  '}
						<FaEdit />
					</li>
					<li className="list-group-item">
						<span className="badge badge-success mr-2">Email:</span>{' '}
						{user.email}
					</li>

					<li className="list-group-item">
						<span className="badge badge-danger">Admin Area</span>
					</li>
					<Link
						onClick={handleLogout}
						to="/admin/create/category"
						className="list-group-item"
					>
						<span className="badge badge-primary">Logout</span>
					</Link>
				</ul>
			</div>
		);
	};
	if (!context.user) return <Redirect to="/login" />;
	return (
		<div className="row dashboard">
			{isAuthenticated() ? (
				<React.Fragment>
					{user && isAdmin() ? (
						<div className="col-3">{adminLeftSide()}</div>
					) : (
						''
					)}

					<div className="col-9">{adminRightSide()}</div>
				</React.Fragment>
			) : (
				<Redirect to="/" />
			)}
		</div>
	);
};
export default Dashboard;
