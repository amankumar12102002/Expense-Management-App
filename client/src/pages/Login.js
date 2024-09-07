import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import '../styles/Loginpage.css';
import img from './Images/img1.jpg';
const Login = () => {
	// const img =
	// 	'https://images.unsplash.com/photo-1593538312308-d4c29d8dc7f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	//from submit
	const submitHandler = async (values) => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				'https://expense-tracker-backend-a8dw.onrender.com/api/v1/users/login',
				values
			);
			setLoading(false);
			message.success('Login Successful');
			localStorage.setItem(
				'user',
				JSON.stringify({ ...data.user, password: '' })
			);
			navigate('/');
		} catch (error) {
			setLoading(false);
			message.error('Invalid email/password');
		}
	};

	//prevent for login user
	useEffect(() => {
		if (localStorage.getItem('user')) {
			navigate('/');
		}
	}, [navigate]);
	return (
		<>
			<div className='login-page '>
				{loading && <Spinner />}
				<div className='row container'>
					<h1>Expense Tracker</h1>
					<div className='col-md-6'>
						<img src={img} alt='login-img' width={'100%'} height='100%' />
					</div>
					<div className='col-md-4 login-form'>
						<Form layout='vertical' onFinish={submitHandler}>
							<h1>Login</h1>

							<Form.Item label='Email' name='email'>
								<Input
									type='email'
									placeholder='Enter email'
									required
									autoComplete='off'
								/>
							</Form.Item>
							<Form.Item label='Password' name='password'>
								<Input type='password' placeholder='Enter password' required />
							</Form.Item>
							<div className='d-flex justify-content-between log'>
								<Link to='/register'>
									Not a user ? Click here to regsiter !
								</Link>
								<button className='btn'>Log in</button>
							</div>
						</Form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
