import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
	createCategory,
	isAdmin,
	isAuthenticated,
} from '../../../helper/helper';

const AddCategory = () => {
	const [name, setName] = useState('');
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const { user, token } = isAuthenticated();
	const goBack = () => (
		<div className="mt-5">
			<Link className="btn btn-sm btn-success mb-3" to="/dashboard">
				Admin Home
			</Link>
		</div>
	);

	const handleChange = (event) => {
		setError('');
		setName(event.target.value);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		createCategory({ name }, token, user._id)
			.then((res) => {
				if (res.error) {
					setError(res.error);
				} else {
					setError('');
					setSuccess(true);
					setName('');
				}
			})
			.catch((error) => console.log(error));
	};

	const successMessage = () => {
		if (success) {
			return <h4 className="text-success">Category created successfully</h4>;
		}
	};

	const warningMessage = () => {
		if (error) {
			return <h4 className="text-success">{error}</h4>;
		}
	};

	const myCategoryForm = () => (
		<form>
			<div className="form-group">
				<p className="lead">Enter the category</p>
				<input
					type="text"
					className="form-control my-3"
					onChange={handleChange}
					value={name}
					autoFocus
					required
					placeholder="For Ex. Travel Mugs"
				/>
				<button onClick={onSubmit} className="btn btn-outline-info">
					Create Category
				</button>
			</div>
		</form>
	);
	if (user && !isAdmin()) {
		alert('Permisson denied');
		return <Redirect to="/" />;
	}
	return (
		<div
			className="row bg-white rounded"
			style={{
				width: '83%',
				margin: 'auto',
				textAlign: 'center',
				marginTop: '75px',
				color: 'black',
				marginBottom: '35px',
			}}
		>
			<div className="col-md-8 offset-md-2">
				{successMessage()}
				{warningMessage()}
				{myCategoryForm()}
				{goBack()}
			</div>
		</div>
	);
};

export default AddCategory;
