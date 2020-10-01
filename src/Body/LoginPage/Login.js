import React, { useState } from 'react';
import './LoginPage.css';
import logo from '../../mugHub.jpg';
import {
	authenticate,
	isAuthenticated,
	login,
	register,
} from '../../helper/helper';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
	const [input, setInput] = useState({
		email: '',
		password: '',
		error: '',
		redirect: false,
	});
	const { email, password, error, redirect } = input;
	const handleButtonLogin = (e) => {
		e.preventDefault();
		console.log({ email, password });
		login({ email, password })
			.then((res) => {
				if (res.error) {
					toast.dark(res.error);
					setInput({ ...input, error: '' });
					return;
				}
				authenticate(res);
				setInput({ ...input, redirect: true });
			})
			.catch((error) => console.log(error));
	};
	const handleButtonRegister = (e) => {
		e.preventDefault();
		let temp = email.split('@');
		let name = temp[0];
		console.log({ name, email, password }, temp);
		register({ name, email, password })
			.then((res) => {
				if (res.error) {
					toast.dark(res.error);
					setInput({ ...input, error: '' });
					return;
				}
				toast.dark('Account Created Successfully Signin to continue');
				setInput({
					...input,
					error: '',
					redirect: false,
				});
				console.log(res);
			})
			.catch((error) => console.log(error));
	};
	const { user } = isAuthenticated();
	if (redirect || user) {
		return <Redirect to="/" />;
	}
	return (
		<div className="App">
			<ToastContainer />
			<div className="login__Wrapper">
				<div className="login__header">
					<Link to="/">
						<img src={logo} alt="logo" />
					</Link>
				</div>

				<div className="login__Body">
					<div className="login__BodyWrapper">
						<div className="login__BodyTitle">Sign In</div>
						<div className="login__BodyCont">
							<input
								className="login__Input"
								type="email"
								id="email"
								value={input.email}
								name="email"
								required
								onChange={(e) => {
									setInput({ ...input, email: e.target.value });
								}}
								placeholder="Email ID"
							/>
							<input
								className="login__Input"
								type="password"
								name="pwd"
								required
								value={input.password}
								onChange={(e) => {
									setInput({ ...input, password: e.target.value });
								}}
								placeholder="Password"
							/>
							<div className="login__BtnWraper">
								<button
									className="login__LoginBtn"
									onClick={(e) => handleButtonLogin(e)}
								>
									Sign In
								</button>
								<div className="login__OrText">Or</div>
								<button
									className="login__RegBtn"
									onClick={(e) => handleButtonRegister(e)}
								>
									Create Account
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="login__errorMessage">{error}</div>
			</div>
		</div>
	);
}

export default Login;
