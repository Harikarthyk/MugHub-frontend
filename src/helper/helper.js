const API = 'https://mughub-sample.herokuapp.com/api';

export const login = (user) => {
	return fetch(`${API}/login/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then((res) => res.json())
		.catch((error) => console.log(error));
};

export const register = (user) => {
	return fetch(`${API}/register`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
		.then((res) => res.json())
		.catch((error) => console.log(error));
};

export const authenticate = (data) => {
	if (typeof window !== undefined) {
		localStorage.setItem('jwt', JSON.stringify(data));
	}
};

export const logout = () => {
	if (typeof window !== undefined) {
		localStorage.removeItem('jwt');
		return fetch(`${API}/logout`, {
			method: 'GET',
		})
			.then((res) => res.json())
			.catch((error) => console.log(error));
	}
};

export const isAuthenticated = () => {
	if (typeof window === undefined) {
		return false;
	}
	if (localStorage.getItem('jwt')) {
		return JSON.parse(localStorage.getItem('jwt'));
	}
	return false;
};

export const getAllCategory = () => {
	return fetch(`${API}/allCategory`, {
		method: 'GET',
	})
		.then((res) => res.json())
		.catch((error) => console.log(error));
};

export const createCategory = (category, token, userId) => {
	return fetch(`${API}/addCategory/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(category),
	})
		.then((res) => res.json())
		.catch((error) => console.log(error));
};

export const createProduct = (product, token, userId) => {
	return fetch(`${API}/create/product/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: product,
	})
		.then((res) => res.json())
		.catch((error) => console.log(error));
};

export const deleteCategory = (userId, categoryId, token) => {
	return fetch(`${API}/delete/category/${categoryId}/${userId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.catch((error) => console.log(error));
};

export const getAllProducts = () => {
	return fetch(`${API}/products/all`, {
		method: 'GET',
	})
		.then((res) => res.json())
		.catch((error) => console.log(error));
};
export const deleteProduct = (productId, userId, token) => {
	return fetch(`${API}/delete/product/${productId}/${userId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.catch((error) => console.log(error));
};
export const getProductByCategory = (categoryId) => {
	return fetch(`${API}/products/all/${categoryId}`, {
		method: 'GET',
	})
		.then((res) => res.json())
		.catch((error) => console.log(error));
};

export const placeOrder = (order, userId, token) => {
	return fetch(`${API}/create/order/${userId}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(order),
	})
		.then((res) => res.json())
		.catch((error) => console.log(error));
};

export const getOrderForUserId = (userId, token) => {
	return fetch(`${API}/order/${userId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.catch((error) => console.log(error));
};

export const updateOrderStatus = (orderId, userId, token) => {
	return fetch(`${API}/update/orders/${orderId}/${userId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ status: 'Deliverd' }),
	})
		.then((res) => res.json())
		.catch((error) => console.log(error));
};

export const getAllOrders = (userId, token) => {
	return fetch(`${API}/allOrders/${userId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.catch((error) => console.log(error, 'a'));
};

export const isAdmin = () => {
	let { user } = isAuthenticated();
	if (user.role === 1) return true;
	return false;
};
