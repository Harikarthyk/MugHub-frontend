import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
	deleteProduct,
	getAllProducts,
	isAuthenticated,
} from '../../../helper/helper';

function ManageProducts() {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const preLoadProducts = () => {
		getAllProducts()
			.then((res) => {
				if (res.error) {
					console.log(res.error);
					return;
				}
				setProducts(res.products);
				setLoading(false);
			})
			.catch((error) => console.log(error));
	};
	useEffect(() => {
		preLoadProducts();
	}, []);
	const deleteThisProduct = (productId) => {
		const { user, token } = isAuthenticated();
		deleteProduct(productId, user._id, token).then((res) => {
			if (res.error) {
				console.log(res.error);
			} else {
				preLoadProducts();
			}
		});
	};
	return (
		<React.Fragment>
			<h2 className="mb-4">All products:</h2>
			<Link className="btn btn-info" to={`/dashboard`}>
				<span className="">Admin Home</span>
			</Link>
			{loading ? 'Loading...' : ''}
			<div className="row">
				<div className="col-12">
					<h2 className="text-center text-white my-3">Total products</h2>

					{products.map((product, index) => {
						return (
							<div key={index} className="row text-center mb-2 ">
								<div className="col-4">
									<i
										className="text-white text-left"
										style={{
											textAlign: 'left',
											marginLeft: '15px',
											display: 'flex',
										}}
									>
										{index + 1} . {product.name}
									</i>
								</div>
								{/* <div className="col-4">
									<Link
										className="btn btn-success"
										to={`/admin/product/update/${product._id}`}
									>
										<span className="">
											<FaEdit />
										</span>
									</Link>
								</div> */}
								<div className="col-4">
									<button
										onClick={() => {
											deleteThisProduct(product._id);
										}}
										className="btn btn-danger"
									>
										<FaTrash />
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</React.Fragment>
	);
}

export default ManageProducts;
