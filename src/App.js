import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './Body/LoginPage/Login';
import Home from './Body/Home/Home';
import NavBar from './Body/NavBar/NavBar';
import Dashboard from './Body/Dashboard/Dashboard';
import AddCategory from './Body/Dashboard/Admin/AddCategory';
import AddProduct from './Body/Dashboard/Admin/AddProduct';
import ManageCategory from './Body/Dashboard/Admin/ManageCategory';
import Cart from './Body/Cart/Cart';
import Footer from './Body/Footer/Footer';
import Order from './Body/Order/Order';
import TrackOrder from './Body/Dashboard/TrackOrder/TrackOrder';
import UserContext from './UserContext';
import { isAdmin } from './helper/helper';
import ManageProducts from './Body/Dashboard/Admin/ManageProducts';
import ManageOrders from './Body/Dashboard/Admin/ManageOrders';

function App() {
	const [user, setUser] = useState(null);
	return (
		<div className="App">
			<UserContext.Provider value={{ user, setUser }}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/">
							<NavBar />
							<Home />
							<Footer />
						</Route>
						<Route exact path="/dashboard">
							<NavBar />
							<Dashboard />
							<Footer />
						</Route>
						<Route exact path="/cart">
							<NavBar />
							<Cart />
							<Footer />
						</Route>{' '}
						<Route path="/place/order">
							<NavBar />
							<Order />
							<Footer />
						</Route>
						<Route path="/track/order">
							<NavBar />
							<TrackOrder />
							<Footer />
						</Route>
						<Route exact path="/admin/create/category">
							<NavBar />
							{user && isAdmin() ? <AddCategory /> : <Redirect to="/" />}

							<Footer />
						</Route>
						<Route exact path="/admin/create/product">
							<NavBar />
							{user && isAdmin() ? <AddProduct /> : <Redirect to="/" />}

							<Footer />
						</Route>
						<Route exact path="/admin/manage/category">
							<NavBar />
							{user && isAdmin() ? <ManageCategory /> : <Redirect to="/" />}
							<Footer />
						</Route>
						<Route exact path="/admin/manage/products">
							<NavBar />
							{user && isAdmin() ? <ManageProducts /> : <Redirect to="/" />}
							<Footer />
						</Route>
						<Route exact path="/admin/manage/orders">
							<NavBar />
							{user && isAdmin() ? <ManageOrders /> : <Redirect to="/" />}
							<Footer />
						</Route>
						<Route path="/*">
							<Redirect to="/" />
						</Route>
					</Switch>
				</BrowserRouter>
			</UserContext.Provider>
		</div>
	);
}

export default App;
