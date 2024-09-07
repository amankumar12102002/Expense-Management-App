import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import '../styles/RegisterPage.css';
const Register = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	//from submit
	const submitHandler = async (values) => {
		try {
			setLoading(true);
			await axios.post('https://expense-tracker-backend-a8dw.onrender.com/api/v1/users/register', values);
			message.success('Registration Successful');
			setLoading(false);
			navigate('/login');
		} catch (error) {
			setLoading(false);
			message.error('User Already Exist');
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
			<div className='register-page '>
				{loading && <Spinner />}
				<Form
					className='register-form'
					layout='vertical'
					onFinish={submitHandler}>
					<h2>Sign up</h2>
					<Form.Item label='Name' name='name'>
						<Input
							type='text'
							placeholder='Enter name'
							required
							autoComplete='off'
						/>
					</Form.Item>
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
					<div className='d-flex justify-content-between'>
						<Link to='/login'>Already have an account? Login here !</Link>
						<button className='btn '>Sign up</button>
					</div>
				</Form>
			</div>
		</>
	);
};

export default Register;
