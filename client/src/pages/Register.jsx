import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../assets/logo (1).svg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { registerRoute } from '../utiles/APIRoutes';

export const TOAST_ERROR = {
  position: 'bottom-right',
  autoClose: 5000,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
}

export const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
	const navigate = useNavigate()

	useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOSTKEY)) {
      navigate('/chat')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = userInfo
    if (password !== confirmPassword) {
      toast.error('Passowrd and confirm password must match', TOAST_ERROR);
			return false
    } else if (email === ''){
			toast.error('Email is required', TOAST_ERROR);
			return false
		} else if (username.length < 3) {
			toast.error('Username must be more than 3 characters', TOAST_ERROR);
			return false
		} else if (password.length < 8) {
			toast.error('password must be more than 7 characters', TOAST_ERROR);
			return false
		} 
		return true; 
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (handleValidation()) {
			const { username, email, password } = userInfo
			const { data } = await axios.post(registerRoute, {
				username, email, password,
			})

			if (data.status === false) {
				toast.error(data.message, TOAST_ERROR)
			}
			if (data.status === true) {
				localStorage.setItem(process.env.REACT_APP_LOCALHOSTKEY, JSON.stringify(data._doc))
				navigate('/chat')
			}
		}
  }

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value })
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Chat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(event) => handleChange(event)}
          />
          <button type="submit">Create New Account</button>
          <span>
            {' '}
            Account already exists ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
	height: 100vh; 
	width: 100vw; 
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem; 
	align-items: center;
	background-color: #131324; 
	.brand {
		display: flex; 
		align-items: center;
		gap: 1rem; 
		justify-content: center; 
		img {
			height: 5rem; 
		}
		h1 {
			color: white; 
			text-transform: uppercase;
		}
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 1.5em; 
		background-color: rgba(22, 35, 35, 0.7); 
		border-radius: 2rem;
		padding: 3rem 5rem; 
		input {
			background-color: transparent; 
			border: 0.1rem solid #4E0EFF; 
			border-radius: .4rem;
			padding: 1.5rem 2.1rem; 
			color: white; 
			width: 100%; 
			font-size: 1rem;
			&:focus {
				border: .1rem solid #997af0;
				outline: none; 
			}
		}
		button {
			background-color: #997af0; 
			color: white; 
			padding: 1rem 2rem;
			border-radius: .6rem; 
			border: none; 
			font-weight: bold; 
			cursor: pointer; 
			font-size: .8rem; 
			letter-spacing: 1px; 
			text-transform: uppercase;
			transition: 0.5s ease-in-out;  	
			&:hover {
				background-color: #4e0eff; 
			}
		}
		span {
			color: white; 
			text-transform: uppercase; 
			a {
				color: #4e0eff;
				text-decoration: none;
				font-weight: bold;  
			}
		}
	}
`
