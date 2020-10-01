import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import {
	deleteCategory,
	getAllCategory,
	isAdmin,
	isAuthenticated,
} from '../../../helper/helper';

function ManageProduct() {
	const [category, setCategory] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const { user, token } = isAuthenticated();
	const handleDelete = (cat) => {
		console.log(cat);
		deleteCategory(user._id, cat._id, token).then((res) => {
			if (res.error) {
				setError(res.error);
				return;
			}
			preLoadCategories();
			setError(res.message);
		});
	};
	const preLoadCategories = () => {
		getAllCategory()
			.then((result) => {
				setCategory(result.category);
				setLoading(false);
			})
			.catch((error) => console.log(error));
	};
	useEffect(() => {
		preLoadCategories();
	}, []);
	if (user && !isAdmin()) {
		alert('Permisson denied');
		return <Redirect to="/" />;
	}
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				margin: 'auto',
				marginTop: '75px',
				marginBottom: '35px',
				alignItems: 'center',
			}}
		>
			<h2>All Category</h2>
			<div className="col-8 list-group" style={{ width: '100%' }}>
				{error ? <div>{error}</div> : ''}
				{loading ? (
					<div>Loading</div>
				) : (
					<div>
						{category.map((p) => {
							return (
								<a
									key={p._id}
									href="#"
									style={{
										width: '325px',
										margin: 'auto',
									}}
									className="list-group-item list-group-item-action list-group-item-primary"
								>
									{p.name} <FaTrash onClick={() => handleDelete(p)} />
								</a>
							);
						})}
					</div>
				)}
			</div>
			<Link to="/dashboard">
				<button
					style={{ marginTop: '20px' }}
					type="button"
					className="btn btn-success"
				>
					Back to Dashboard
				</button>
			</Link>
		</div>
	);
}

export default ManageProduct;
