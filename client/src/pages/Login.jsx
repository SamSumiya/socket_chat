import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { loginRoute } from '../utiles/APIRoutes'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo (1).svg'

const DISPLAY_TOAST = {
  postion: 'bottom-left',
  autoClose: 5000,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
}

export const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()


	useEffect(() => {
		if (localStorage.getItem(process.env.REACT_APP_LOCALHOSTKEY)) {
			navigate('/chat')
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

  const handleUserInputValidation = () => {
    const { email, password } = userInfo

    if (email === '') {
      toast.error('Email can not be empty...', DISPLAY_TOAST)
      return false
    }
    if (password === '') {
      toast.error('password can not be empty...', DISPLAY_TOAST)
      return false
    }
    return true
  }

  const handleForm = async (event) => {
    event.preventDefault()
    if (handleUserInputValidation()) {
      const { email, password } = userInfo
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      })

      if (!data.status) {
        toast.error(data.message, DISPLAY_TOAST)
      }
      if (data.status) {
				localStorage.setItem(process.env.REACT_APP_LOCALHOSTKEY, JSON.stringify(data.user))
        navigate('/chat')
      }
    }
  }

  const handleLogin = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value })
  }



  return (
    <>
      <LoginComponent>
        <form onSubmit={(event) => handleForm(event)}>
					<div className='title'>
						<img src={Logo} alt="Logo" />
						<h1> Login </h1>
					</div>
          <input
            type="email"
            name="email"
            value={userInfo.name}
            onChange={(event) => handleLogin(event)}
          />
          <input
            type="password"
            name="password"
            value={userInfo.password}
            onChange={(event) => handleLogin(event)}
          />
          <button>Login</button>
					<span> Create new account <Link to='/register'>Register</Link></span>
        </form>
      </LoginComponent>
      <ToastContainer />
    </>
  )
}

const LoginComponent = styled.div`
	display: flex;
	height: 100vh; 
	width: 100vw;
	flex-direction: column;
	justify-content: center;
	align-items: center; 
	background-color: #131330;
	gap: 1rem; 
	.title {
		gap: 1rem; 
		display: flex;
		justify-content: center; 
		align-items: center;
		img {
			width: 5rem; 
		}
		h1 {
			color: white;
			text-transform: uppercase; 	
		}
		margin-bottom: 1rem;
	}
	form {
		display: flex; 
		flex-direction: column; 
		gap: .6rem; 
		background-color: rgba(22, 35, 35, 0.9);
		border-radius: 2rem; 
		padding: 5rem 6rem; 
		input {
			border-radius: 5px; 
			border: 2.5px solid #4E0EFF; 
			padding: .8rem 1.5rem;
			width: 100%; 
			font-size: 1rem; 
			color: white;  
			background-color: transparent; 

			&:focus {
				outline: none; 
				border: .1rem solid #997af0;
			}
		}
	}
	button {
		padding: 1rem .3rem; 
		margin-top: .5rem;
		border-radius: 5px;
		border: 2px solid rgba(125, 115, 111, 0.6); 
		font-size: 19px; 
		font-weight: bold;
		letter-spacing: 1px; 
		color: white; 
		text-transform: uppercase; 
		background-color: rgba(30, 40, 30, 0.6); 
		&:hover {
			background-color: rgba(30, 40, 30, 1); 
		}
		margin-bottom: 10px; 
	}
	span {
		color: white;
		text-transform: uppercase;
		text-decoration: none;
		font-size: 11px; 
	}
	a {
		color: #4eeeff;
		font-size: 18px; 
		text-decoration: none;
		text-transform: uppercase;
	}
	
`
