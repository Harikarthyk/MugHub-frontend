import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
	createProduct,
	getAllCategory,
	isAdmin,
	isAuthenticated,
} from '../../../helper/helper';

const AddProduct = () => {
	const { user, token } = isAuthenticated();
	const [message, setMessage] = useState(false);
	const [values, setValues] = useState({
		name: '',
		description: '',
		sellingPrice: '',
		stock: '',
		photo: '',
		categories: [],
		category: '',
		loading: false,
		error: '',
		createdProduct: '',
		getaRedirect: false,
		formData: '',
	});
	const {
		name,
		description,
		sellingPrice,
		stock,
		categories,
		category,
		loading,
		error,
		createdProduct,
		getaRedirect,
		formData,
	} = values;
	useEffect(() => {
		preLoadCategory();
	}, []);
	const preLoadCategory = () => {
		getAllCategory()
			.then((res) => {
				if (res.error) {
					setValues({ ...values, error: res.error });
					return;
				}
				setValues({
					...values,
					categories: res.category,
					formData: new FormData(),
				});
			})
			.catch((error) => console.log(error));
	};
	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: '', loading: true });
		createProduct(formData, token, user._id).then((res) => {
			console.log(res);
			if (res.error) {
				setValues({ ...values, error: res.error });
			} else {
				let temp = name;
				setValues({
					...values,
					name: '',
					description: '',
					sellingPrice: '',
					photo: '',
					stock: '',
					loading: false,
					createdProduct: temp,
					error: '',
				});
				setMessage(true);
			}
		});
	};

	const handleChange = (name) => (event) => {
		const value = name === 'photo' ? event.target.files[0] : event.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	const createProductForm = () => (
		<form>
			<span>Add new Mugs</span>
			<div className="form-group">
				<label className="btn btn-block btn-success">
					<input
						onChange={handleChange('photo')}
						type="file"
						name="photo"
						accept="image"
						placeholder="choose a file"
					/>
				</label>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange('name')}
					name="photo"
					className="form-control"
					placeholder="Name"
					value={name}
				/>
			</div>
			<div className="form-group">
				<textarea
					onChange={handleChange('description')}
					name="photo"
					className="form-control"
					placeholder="Description"
					value={description}
				/>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange('sellingPrice')}
					type="number"
					className="form-control"
					placeholder="sellingPrice"
					value={sellingPrice}
				/>
			</div>
			<div className="form-group">
				<select
					onChange={handleChange('category')}
					className="form-control"
					placeholder="Category"
				>
					<option>Select Category</option>
					{categories &&
						categories.map((cate, index) => (
							<option key={index} value={cate._id}>
								{cate.name}
							</option>
						))}
				</select>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange('stock')}
					type="number"
					className="form-control"
					placeholder="Stock"
					value={stock}
				/>
			</div>

			<button
				type="submit"
				onClick={onSubmit}
				className="btn btn-outline-success mb-3"
			>
				Create Product
			</button>
		</form>
	);
	if (user && !isAdmin()) {
		alert('Permisson denied');
		return <Redirect to="/" />;
	}
	return (
		<div
			style={{
				margin: '100px 20px',
			}}
		>
			<Link to="/dashboard" className="btn btn-md btn-dark mb-3">
				Admin Home
			</Link>
			<div className="row bg-dark text-white rounded">
				<div className="col-md-8 offset-md-2">
					{message ? (
						<div
							className="alert alert-success mt-3"
							style={{ display: createdProduct ? '' : 'none' }}
						>
							<h4>{createdProduct} created successfully</h4>
						</div>
					) : (
						''
					)}
					{createProductForm()}
				</div>
			</div>
		</div>
	);
};

export default AddProduct;
